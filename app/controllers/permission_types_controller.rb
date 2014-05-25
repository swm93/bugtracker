class PermissionTypesController < ApplicationController


  def index
    @permission_types = PermissionType.all()

    render(:json => @permission_types)
  end

  def show
    @permission_type = PermissionType.find(params[:id])

    render(:json => @permission_type)
  end
end
