#   BUG MODEL
# Properties:
#   summary (string): brief explaination of the bug
#   description (text): description of the bug
# To Do:
#   add properties: assignee, steps to reproduce, expected outcome, actual
#     behavior, date due, version fixed in
class Bug < ActiveRecord::Base
  belongs_to :project
end
