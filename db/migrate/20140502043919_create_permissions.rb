class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.belongs_to :user
      t.belongs_to :project
      t.integer :access, default: 0

      t.timestamps
    end
  end
end
