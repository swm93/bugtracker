# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Load the app's custom environment variables here, before environments/*.rb
env_vars = File.join(Rails.root, 'config', 'initializers', 'env_vars.rb')
load(app_env_vars) if File.exists?(env_vars)

# Initialize the Rails application.
Bugtracker::Application.initialize!

Bugtracker::Application.configure do
  config.app_name = "BugTracker"
  config.windows_tile_color = "#00a300"
end