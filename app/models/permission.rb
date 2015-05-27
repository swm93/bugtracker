class Permission < ActiveRecord::Base
  include PublicActivity::Model

  belongs_to :user, dependent: :destroy
  belongs_to :project, dependent: :destroy

  enum access: { read: 0, write: 1 }

  tracked
end
