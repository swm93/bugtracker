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


  protected

  def authenticate_user
    if (session[:user_id])
       # set current user object to @current_user object variable
      @current_user = User.find(session[:user_id])
      return true 
    else
      redirect_to(:controller => 'sessions', :action => 'login')
      return false
    end
  end

  def save_login_state
    if (session[:user_id])
      redirect_to(:controller => 'projects', :action => 'index')
      return false
    else
      return true
    end
  end


  private

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def parse_query_string(query_string)
    CGI.parse(query_string)
  end
end
