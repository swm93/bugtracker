class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery :with => :exception


  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
    @current_user ||= User.find_by_authentication_token(cookies[:auth_token]) if (cookies[:auth_token])

    @current_user
  end


  protected

  def authenticate_user
    session[:user_id].present?()
  end

  def validate_write_permissions
    permission_denied() unless has_write_permission?()
  end

  def validate_read_permissions
    permission_denied() unless has_read_permission?()
  end

  def save_login_state
    if (session[:user_id])
      return false
    else
      return true
    end
  end


  private

  def not_found
    render(:nothing => true, :status => :not_found)
  end

  def permission_denied
    render(:nothing => true, :status => :unauthorized)
  end

  def parse_query_string(query_string)
    CGI.parse(query_string)
  end

  #return the permission for the current user and project if there is one, otherwise nil
  def get_permission
    if (current_user)
      project_id_key = get_project_id_key()
      permission = Permission.where({:user_id => current_user.id, :project_id => params[project_id_key]})[0]
    end
  end

  #check if the current user has read permissions for the current project
  def has_read_permission?
    permission = get_permission() if current_user
    permission.permission_type.read unless permission.nil?()
  end

  #check if the current user has write permissions for the current project
  def has_write_permission?
    permission = get_permission() if current_user
    permission.permission_type.write unless permission.nil?()
  end

  def get_project_id_key
    controller_name === "projects" ? :id : :project_id
  end
end
