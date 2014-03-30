class ProjectsController < ApplicationController
  layout :get_projects_layout

  def index
    @projects = Project.all()

    respond_to do |format|
      format.html
      format.json { render :json => @projects }
    end
    projects_path.inspect()
  end

  def show
    @project = Project.find(params[:id])
    redirect_to({:controller => :bugs, :action => :index, :project_id => params[:id]})
  end

  def new
    @project = Project.new()
  end

  def create
    @project = Project.new(project_params)

    if @project.save()
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
end
