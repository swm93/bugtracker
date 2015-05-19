class SessionsController < ApplicationController
  # before_action :save_login_state, :only => [:login, :login_attempt]


  def login_attempt
    authorized_user = User.authenticate(params[:email], params[:password])

    if (authorized_user)
      #don't need to handle errors here, its not a big deal if it fails
      update_authentication_token(authorized_user, params[:remember_me])
      authorized_user.save()

      session[:user_id] = authorized_user.id
      render(:json => {:user => authorized_user} || {}, :except => [:password, :password_salt, :authentication_token])
    else
      render(:json => {:errors => "Invalid email or password."}, :status => :unprocessable_entity)
    end
  end

  def logout
    if (current_user)
      #don't need to handle errors here, its not a big deal if it fails
      update_authentication_token(current_user)
      current_user.save()
    end

    session[:user_id] = nil

    render(:nothing => true)
  end


  private

  def update_authentication_token(user, remember_me = nil)
    auth_token = remember_me ? SecureRandom.urlsafe_base64 : nil

    user.authentication_token = auth_token
    cookies.permanent[:auth_token] = auth_token
  end
end
