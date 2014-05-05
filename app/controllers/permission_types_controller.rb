class PermissionTypesController < ApplicationController

  def index
    @permission_types = PermissionType.all()

    respond_to do |format|
      format.json { render :json => @permission_types }
    end
  end
end
