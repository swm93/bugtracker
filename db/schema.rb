# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140503012317) do

  create_table "bugs", force: true do |t|
    t.integer  "number"
    t.string   "summary"
    t.text     "description"
    t.string   "status"
    t.string   "priority"
    t.integer  "assignee_id"
    t.integer  "reporter_id"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "permission_types", force: true do |t|
    t.string   "name"
    t.boolean  "read"
    t.boolean  "write"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "permissions", force: true do |t|
    t.integer  "user_id"
    t.integer  "project_id"
    t.integer  "permission_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "projects", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "public"
    t.integer  "bug_count",   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sqlite_sp_functions", id: false, force: true do |t|
    t.text "name"
    t.text "text"
  end

# Could not dump table "sqlite_stat1" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

# Could not dump table "sqlite_stat4" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

  create_table "sqlite_vs_links_names", id: false, force: true do |t|
    t.text "name"
    t.text "alias"
  end

  create_table "sqlite_vs_properties", id: false, force: true do |t|
    t.text "parentType"
    t.text "parentName"
    t.text "propertyName"
    t.text "propertyValue"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "name"
    t.string   "password"
    t.string   "password_salt"
    t.string   "authentication_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
