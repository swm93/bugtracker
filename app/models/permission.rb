class Permission < ActiveRecord::Base
  belongs_to :user, :dependent => :delete
  belongs_to :project, :dependent => :delete

  enum access: { read: 0, write: 1 }
end
