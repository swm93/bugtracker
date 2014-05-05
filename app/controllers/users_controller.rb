class UsersController < ApplicationController
  before_action :save_login_state, :only => [:new, :create]
  layout :get_login_layout


  def index
    if (params[:name])
      @users = User.where('name LIKE ?', "%#{params[:name]}%")
    elsif (params[:email])
      @users = User.where('email LIKE ?', "%#{params[:email]}%")
    else
      @users = User.all();
    end

    respond_to do |format|
      format.html
      format.json { render :json => @users, :except => [:password, :password_salt] }
    end
  end

  def new
    @user = User.new()
  end

  def create
    @user = User.new(user_params())

    if (@user.save())
      flash[:notice] = "You signed up successfully"
      flash[:color] = "valid"
      redirect_to(:controller => 'projects', :action => 'index')
    else
      flash[:notice] = "Form is invalid"
      flash[:color] = "invalid"
      redirect_to(:action => 'new')
    end
  end


  private

  def user_params
    params.require(:user).permit(
      :email,
      :name,
      :password,
      :password_confirmation
    )
  end
end
