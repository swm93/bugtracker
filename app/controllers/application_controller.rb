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

  #TODO: validate_read_permissions/validate_write_permissions may make this unneeded
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

  def validate_write_permissions
    id_key = get_project_id_key()
    permission_denied() if (!Permission.joins(:permission_type).where({:user_id => session[:user_id], :project_id => params[id_key], :permission_types => {:write => 1}}).exists?())
  end

  def validate_read_permissions
    id_key = get_project_id_key()
    permission_denied() if (!params[:public] && !Permission.joins(:permission_type).where({:user_id => session[:user_id], :project_id => params[id_key], :permission_types => {:read => 1}}).exists?())
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
    render(:file => "public/404.html", :status => :not_found)
  end

  def permission_denied
    render(:file => "public/401.html", :status => :unauthorized)
  end

  def parse_query_string(query_string)
    CGI.parse(query_string)
  end

  def get_project_id_key
    controller_name === "projects" ? :id : :project_id
  end
end
