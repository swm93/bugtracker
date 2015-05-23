class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password
      t.string :password_salt
      t.string :authentication_token
      t.integer :status, default: 0
      t.string :confirm_token
      t.datetime :confirm_token_created_at

      t.timestamps
    end
  end
end
