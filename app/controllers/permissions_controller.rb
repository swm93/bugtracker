class PermissionsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_write_permissions, :only => [:edit, :update, :destory]
  before_action :validate_read_permissions, :except => [:index, :new, :create]
  

  def index
    @permissions = Permission.where(:project_id => params[:project_id])

    render(:json => {:permissions => @permissions}, :except => [:user_id, :permission_type_id, :project_id], :include => {
      :user => { :only => [:id, :name] },
      :permission_type => { :only => [:id, :name] },
      :project => { :only => [:id, :name] }
    })
  end

  def show
    @permission = Permission.find(params[:id])

    render(:json => {:permission => @permission})
  end

  def create
    permitted = permission_params()
    @permission = Permission.create(permitted)
    @permission.user_id = params[:user_id] unless permitted.has_key?(:user_id)
    @permission.project_id = params[:project_id] unless permitted.has_key?(:project_id)
    # @permission.user = User.find_by_email(params[:permission][:email]) unless permitted.has_key?(:user_id)
    # @permission.project = Project.find(params[:project_id]) unless permitted.has_key?(:project_id)

    if (@permission.save())
      render(:json => @permission, :status => :created)
    else
      render(:json => @permission.errors, :status => :unprocessable_entity)
    end
  end

  def update
    @permission = Permission.find(params[:id])

    if (@permission.update(permission_params()))
      render(:json => @permission, :status => :ok)
    else
      render(:json => @permission.errors, :status => :unprocessable_entity)
    end
  end

  def destroy
    @permission = Permission.find(params[:id])
    
    if (@permission.destroy())
      render(:nothing => true, :status => :no_content)
    else
      render(:json => @permission.errors, :status => :unprocessable_entity)
    end
  end


  private

  def permission_params
    params.require(:permission).permit(
      :user_id,
      :project_id,
      :permission_type_id,
      :email
    )
  end
end
