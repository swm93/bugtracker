class PermissionsController < ApplicationController
  before_action :authenticate_user
  before_action :validate_write_permissions, only: [:edit, :update, :destory]
  before_action :validate_read_permissions, except: [:index, :new, :create]


  def index
    @permissions = Permission.where(project_id: params[:project_id])

    render(
      json: {
        permissions: @permissions
      },
      except: [:user_id, :project_id],
      include: {
        user: {
          only: [:id, :name]
        },
        project: {
          only: [:id, :name]
        }
      }
    )
  end

  def show
    @permission = Permission.find(params[:id])

    render(
      json: {permission: @permission},
      status: :ok
    )
  end

  def create
    @permission = Permission.new(permission_params())

    if (@permission.save())
      render(
        json: @permission,
        status: :created
      )
    else
      render(
        json: @permission.errors,
        status: :unprocessable_entity
      )
    end
  end

  def update
    @permission = Permission.find(params[:id])

    if (@permission.update(permission_params()))
      render(
        json: @permission,
        status: :ok
      )
    else
      render(
        json: @permission.errors,
        status: :unprocessable_entity
      )
    end
  end

  def destroy
    @permission = Permission.find(params[:id])

    if (@permission.destroy())
      render(
        nothing: true,
        status: :no_content
      )
    else
      render(
        json: @permission.errors,
        status: :unprocessable_entity
      )
    end
  end


  private

  def permission_params
    params.require(:permission).permit(
      :user_id,
      :project_id,
      :access
    )
  end
end
