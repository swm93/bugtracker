module ApplicationHelper

  def get_relative_asset_path
    return controller_name + "/" + action_name
  end
end
