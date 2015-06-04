class Permission < ActiveRecord::Base
  include PublicActivity::Model

  belongs_to :user, dependent: :destroy
  belongs_to :project, dependent: :destroy

  enum access: { read: 0, write: 1 }

  validates :project,
    presence: true
  validates :user,
    presence: true

  tracked
end
