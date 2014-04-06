class CreateUsersProjects < ActiveRecord::Migration
  def change
    create_table :users_projects do |t|
      t.belongs_to :user
      t.belongs_to :project
    end
  end
end
