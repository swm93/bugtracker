class ProjectsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_write_permissions, :only => [:edit, :update, :destory]
  before_action :validate_read_permissions, :except => [:index, :new, :create]
  layout :get_projects_layout

  def index
    @projects = Project.joins(:permissions).where({:permissions => {:user_id => session[:user_id]}})

    respond_to do |format|
      format.html
      format.json { render :json => @projects }
    end
    projects_path.inspect()
  end

  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html { redirect_to({:controller => :bugs, :action => :feed, :project_id => params[:id]}) }
      format.json { render(:json => @project, :include => { :permissions => { :include => [ :permission_type, :user => { :except => [:password, :password_salt] }]}})}#:include => { :users => { :except => [:password, :password_salt], :include => { :permissions => { :include => :permission_type }}}}) }
    end
  end

  def new
    @project = Project.new()
  end

  def create
    @project = @current_user.projects.create(project_params())

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

    if (@project.update(project_params()))
      render(:nothing => true)
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
      :description,
      :public
    )
  end
end
