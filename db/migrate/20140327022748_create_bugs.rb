class CreateBugs < ActiveRecord::Migration
  def change
    create_table :bugs do |t|
      t.integer :number
      t.string :summary
      t.text :description
      t.string :status
      t.string :priority
      t.integer :assignee_id
      t.integer :reporter_id
      t.belongs_to :project

      t.timestamps
    end
  end
end
