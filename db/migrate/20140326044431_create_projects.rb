class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.boolean :public
      t.integer :bug_count, :default => 0

      t.timestamps
    end
  end
end
