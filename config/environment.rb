# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Bugtracker::Application.initialize!

Bugtracker::Application.configure do
  config.app_name = "BugTracker"
  config.windows_tile_color = "#00a300"
end