class Permission < ActiveRecord::Base
  belongs_to :user, dependent: :destroy
  belongs_to :project, dependent: :destroy

  enum access: { read: 0, write: 1 }
end
