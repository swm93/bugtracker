class UsersController < ApplicationController
  # before_action :save_login_state, only: [:new, :create]


  #TODO: remove/refactor this
  def index
    if (params[:name])
      @users = User.where('name LIKE ?', "%#{params[:name]}%")
    elsif (params[:email])
      @users = User.where('email LIKE ?', "%#{params[:email]}%")
    else
      @users = User.all();
    end

    render(
      json: @users,
      except: [:password, :password_salt, :authentication_token, :confirm_token, :confirm_token_created_at]
    )
  end

  def show
    @user = User.find(params[:id])

    render(
      json: @user,
      except: [:password, :password_salt, :authentication_token, :confirm_token, :confirm_token_created_at]
    )
  end

  def create
    @user = User.new(user_params())

    if (@user.save())
      UserMailer.welcome_email(@user).deliver

      #TODO: find out if session[:user_id] needs to be set
      session[:user_id] = @user.id
      @currentUser = @user

      render(
        json: @user,
        except: [:password, :password_salt],
        status: :created
      )
    else
      render(
        json: @user.errors,
        status: :unprocessable_entity
      )
    end
  end

  def get_current_user
    render(
      json: {
        user: current_user
      } || {},
      except: [:password, :password_salt, :authentication_token],
      status: :ok
    )
  end

  def confirm_email
    user = User.find_by(confirm_token: params[:confirm_token])

    if (user)
      user.activate

      render(
        json: @user, except: [:password, :password_salt],
        status: :ok
      )
    else
      #TODO: handle error
      render(
        json: {
          confirm_token: "not found"
        },
        status: :bad_request
      )
    end
  end

  def statistics
    if (current_user)
      stats = {
        number_projects: Permission.where({user_id: current_user.id}).count,
        number_bugs: Bug.joins(project: :users).where({
          users: {
            id: current_user.id
          }
        }).count,
        number_resolved_bugs: Bug.joins(project: :users).where({
          users: {
            id: current_user.id
          },
          status: 'resolved'
        }).count
      }
    end

    render(
      json: stats,
      status: :ok
    )
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
