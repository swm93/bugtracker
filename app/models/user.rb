class User < ActiveRecord::Base
  has_and_belongs_to_many :projects, join_table: :users_projects
end
