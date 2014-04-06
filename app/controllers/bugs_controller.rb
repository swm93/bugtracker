class BugsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_bug_owner, :only => [:show, :edit, :destroy]
  before_action :validate_project_owner

  def index
    @bugs = Bug.where(:project_id => params[:project_id])

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
      :description
    )
  end

  def validate_bug_owner
    if (!Bug.where({:id => params[:id], :project_id => params[:project_id]}).exists?())
      not_found()
    end
  end

  def validate_project_owner
    if (!User.find(session[:user_id]).projects.where(:id => params[:project_id]).exists?())
      not_found()
    end
  end
end
