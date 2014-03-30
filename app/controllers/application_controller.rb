class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def get_bugs_layout
    return 'bugs'
  end

  def get_projects_layout
    return 'projects'
  end

  def get_login_layout
    return 'login'
  end


  private

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
