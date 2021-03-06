#   BUG MODEL
# Properties:
#   summary (string): brief explaination of the bug
#   description (text): description of the bug
# To Do:
#   add properties: steps to reproduce, expected outcome, actual
#     behavior, date due, version fixed in
class Bug < ActiveRecord::Base
  include PublicActivity::Model

  belongs_to :project, dependent: :destroy

  after_validation :set_bug_number, on: :create

  validates :summary,
    presence: true
  validates_uniqueness_of :number

  tracked


  private

  def set_bug_number
    next_number = self.project.bug_count + 1
    self.number = next_number
    self.project.update_column(:bug_count, next_number)
  end
end
