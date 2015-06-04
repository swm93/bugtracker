class ProjectsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_logged_in, except: [:show]
  before_action :validate_write_permissions, only: [:edit, :update, :destory]
  before_action :validate_read_permissions, except: [:index, :new, :create]

  def index
    @projects = Project.joins(:permissions).where({
      permissions: {
        user_id: session[:user_id]
      }
    })

    render(
      json: @projects,
      methods: [ :image_url ],
      status: :ok
    )
  end

  def show
    @project = Project.find(params[:id])

    render(
      json: @project,
      methods: [ :image_url ],
      status: :ok
    )
  end

  def create
    @project = current_user.projects.new(project_params())
    @project.permissions.new({
      user: current_user,
      project: @project,
      access: :write
    })

    if (@project.save())
      render(
        json: @project,
        methods: [ :image_url ],
        status: :created
      )
    else
      render(
        json: @project.errors,
        methods: [ :image_url ],
        status: :unprocessable_entity
      )
    end
  end

  def update
    @project = Project.find(params[:id])

    if (@project.update(project_params()))
      render(
        json: @project,
        methods: [ :image_url ],
        status: :created
      )
    else
      render(
        json: @project.errors,
        methods: [ :image_url ],
        status: :unprocessable_entity
      )
    end
  end

  def destroy
    @project = Project.find(params[:id])

    if (@project.destroy())
      render(
        nothing: true,
        status: :no_content
      )
    else
      render(
        json: @project.errors,
        methods: [ :image_url ],
        status: :unprocessable_entity
      )
    end
  end


  private

  def project_params
    params.require(:project).permit(
      :name,
      :description,
      :image,
      :public
    )
  end
end
