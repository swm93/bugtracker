class Permission < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  belongs_to :permission_type

end
