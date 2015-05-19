class UsersController < ApplicationController
  wrap_parameters :format => [:json]

  # before_action :save_login_state, :only => [:new, :create]


  #TODO: remove/refactor this
  def index
    if (params[:name])
      @users = User.where('name LIKE ?', "%#{params[:name]}%")
    elsif (params[:email])
      @users = User.where('email LIKE ?', "%#{params[:email]}%")
    else
      @users = User.all();
    end

    render(:json => @users, :except => [:password, :password_salt])
  end

  def create
    @user = User.new(user_params())

    if (@user.save())
      #TODO: find out if session[:user_id] needs to be set
      session[:user_id] = @user.id
      @currentUser = @user

      render(:json => @user, :except => [:password, :password_salt], :status => :created)
    else
      render(:json => @user.errors, :status => :unprocessable_entity)
    end
  end

  def get_current_user
    render(:json => {:user => current_user} || {}, :except => [:password, :password_salt, :authentication_token])
  end


  private

  def user_params
    params.require(:user).permit(
      :email,
      :name,
      :password,
      :password_confirmation,
      :remember_me
    )
  end
end
