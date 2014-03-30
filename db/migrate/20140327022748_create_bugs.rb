class CreateBugs < ActiveRecord::Migration
  def change
    create_table :bugs do |t|
      t.string :summary
      t.text :description
      t.belongs_to :project

      t.timestamps
    end
  end
end
