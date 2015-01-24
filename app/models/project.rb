class Project < ActiveRecord::Base
  has_many :permissions
  has_many :users, :through => :permissions
  has_many :bugs
end
