class ProjectsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_project_owner, :only => [:show, :edit, :destory]
  layout :get_projects_layout

  def index
    @projects = User.find(session[:user_id]).projects

    respond_to do |format|
      format.html
      format.json { render :json => @projects }
    end
    projects_path.inspect()
  end

  def show
    @project = Project.find(params[:id])
    redirect_to({:controller => :bugs, :action => :feed, :project_id => params[:id]})
  end

  def new
    @project = Project.new()
  end

  def create
    @user = User.find(session[:user_id])
    @project = @user.projects.create(project_params())

    if (@project.save())
      redirect_to(@project)
    else
      render('new')
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])

    if @project.update(project_params)
      redirect_to(@project)
    else
        render('edit')
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy()

    redirect_to(projects_path)
  end


  private

  def project_params
    params.require(:project).permit(
      :name,
      :description
    )
  end

  def validate_project_owner
    if (!User.find(session[:user_id]).projects.where(:id => params[:id]).exists?())
      not_found()
    end
  end
end
