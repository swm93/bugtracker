class SessionsController < ApplicationController
  before_action :save_login_state, :only => [:login, :login_attempt]
  layout :get_login_layout

  def login

  end

  def login_attempt
    authorized_user = User.authenticate(params[:email], params[:password])

    if (authorized_user)
      session[:user_id] = authorized_user.id
      redirect_to(:controller => 'projects', :action => 'index')
    else
      flash[:danger] = "Invalid Username or Password"
      redirect_to(:action => 'login')
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to(:action => 'login')
  end
end
