class BugsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_bug_existance, only: [:show, :edit, :update, :destroy]
  before_action :validate_write_permissions, only: [:new, :create, :edit, :update, :destory]
  before_action :validate_read_permissions

  def index
    if (request.query_string)
      @bugs = get_bugs_with_query(request.query_string)
    else
      @bugs = Bug.where(project_id: params[:project_id])
    end

    render(
      json: @bugs,
      status: :ok
    )
  end

  def show
    @bug = Bug.find(params[:id])

    render(
      json: @bug,
      status: :ok
    )
  end

  def create
    # @project = Project.find(params[:project_id])
    # @bug = @project.bugs.create(bug_params())
    permitted = bug_params()
    @bug = Bug.new(permitted)
    @bug.project_id = params[:project_id] unless permitted.has_key?(:project_id)

    if (@bug.save())
      render(
        json: @bug,
        status: :created
      )
    else
      render(
        json: @bug.errors,
        status: :unprocessable_entity
      )
    end
  end

  def update
    @bug = Bug.find(params[:id])

    if (@bug.update(bug_params()))
      render(
        json: @bug,
        status: :ok
      )
    else
      render(
        json: @bug.errors,
        status: :unprocessable_entity
      )
    end
  end

  def destroy
    @bug = Bug.find(params[:id])

    if (@bug.destroy())
      render(
        nothing: true,
        status: :no_content
      )
    else
      render(
        json: @bug.errors,
        status: :unprocessable_entity
      )
    end
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

  #TODO: remove this
  def validate_bug_existance
    not_found() if (!Bug.where({id: params[:id]}).exists?())
  end

  def get_bugs_with_query(query_string)
    query_data = parse_query_string(query_string)
    query_data[:project_id] = params[:project_id]
    Bug.where(query_data)
  end
end
