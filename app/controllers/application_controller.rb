class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
    @current_user ||= User.find_by_authentication_token(cookies[:auth_token]) if (cookies[:auth_token])

    @current_user
  end


  # TODO: Investigate differences between save_login_state and authenticate_user
  protected

  def authenticate_user
    session[:user_id].present?()
  end

  def validate_logged_in
    forbidden() unless current_user
  end

  def validate_write_permissions
    unauthorized() unless has_permission?('write')
  end

  def validate_read_permissions
    unauthorized() unless has_permission?('read')
  end

  def save_login_state
    !session[:user_id].present?()
  end


  private

  ##    Not Found
  #   Return: Error with status :not_found (404).
  def not_found
    render(
      nothing: true,
      status: :not_found
    )
  end

  ##    Forbidden
  #   Return: Error with status :forbidden (403).
  def forbidden
    render(
      nothing: true,
      status: :forbidden
    )
  end

  ##    Unauthorized
  #   Returns: Error with status :unauthorized (401).
  def unauthorized
    render(
      nothing: true,
      status: :unauthorized
    )
  end

  def parse_query_string(query_string)
    CGI.parse(query_string)
  end

  ##    Get Permission
  #   ToDo:   This function is very odd... Gets permission for project, nothing
  #           else
  #   Return: Permission for the current user and project if one exists,
  #           otherwise nil
  def get_permission
    project_id_key = get_project_id_key()
    project = Project.find(params[project_id_key])

    if (current_user)
      permission = Permission.where({
        user_id: current_user.id,
        project_id: params[project_id_key]
      }).first
    end

    project.try(:public) || permission
  end

  #check if the current user has permissions for the current project
  def has_permission?(access)
    permission = get_permission()
    permission.access >= access unless permission.nil?()
  end

  def get_project_id_key
    controller_name === "projects" ? :id : :project_id
  end
end
