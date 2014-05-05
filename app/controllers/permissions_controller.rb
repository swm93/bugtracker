class PermissionsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_write_permissions
  

  def create
    permitted = permission_params()
    @permission = Permission.create(permitted)
    @permission.user = User.find_by_email(params[:permission][:email]) unless permitted.has_key?(:user_id)
    @permission.project = Project.find(params[:project_id]) unless permitted.has_key?(:project_id)

    if (@permission.save())
      render(:nothing => true)
    else
      #TODO: handle error
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
