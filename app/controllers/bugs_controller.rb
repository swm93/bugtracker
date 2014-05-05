class BugsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_bug_existance, :only => [:show, :edit, :update, :destroy]
  before_action :validate_write_permissions, :only => [:new, :create, :edit, :update, :destory]
  before_action :validate_read_permissions

  def index
    if (request.query_string && params[:format] == "json")
      @bugs = get_bugs_with_query(request.query_string)
    else
      @bugs = Bug.where(:project_id => params[:project_id])
    end

    respond_to do |format|
      format.html
      format.json { render :json => @bugs }
    end
    project_bugs_path.inspect()
  end

  def new
    @bug = Bug.new()
  end

  def create
    @project = Project.find(params[:project_id])
    @bug = @project.bugs.create(bug_params())

    if @bug.save()
      redirect_to(project_bug_path(:id => @bug.id))
    else
      render(new_project_bug_url)
    end
  end

  def edit
    @bug = Bug.find(params[:id])
  end

  def update
    @bug = Bug.find(params[:id])

    if @bug.update(bug_params)
      redirect_to(@bug)
    else
      render(edit_project_bug_url(params[:id]))
    end
  end

  def destroy
    @bug = Bug.find(params[:id])
    @bug.destroy()

    redirect_to(project_bugs_path)
  end

  def feed

  end

  def groups

  end


  private

  def bug_params
    params.require(:bug).permit(
      :summary,
      :description,
      :status,
      :priority,
      :assignee_id,
      :reporter_id
    )
  end

  def validate_bug_existance
    not_found() if (!Bug.where({:id => params[:id]}).exists?())
  end

  def get_bugs_with_query(query_string)
    query_data = parse_query_string(query_string)
    query_data[:project_id] = params[:project_id]
    Bug.where(query_data)
  end
end
