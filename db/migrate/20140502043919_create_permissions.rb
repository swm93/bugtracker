class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.belongs_to :user
      t.belongs_to :project
      t.integer :permission_type_id

      t.timestamps
    end
  end
end
