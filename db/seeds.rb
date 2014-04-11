# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([
  {
    :name => "Scott Mielcarski",
    :email => "scott_mielcarski@me.com",
    :password => "password"
  },
  {
    :name => "Test",
    :email => "test@test.com",
    :password => "password"
  }
])

projects = Project.create([
  {
    :name => "Project Number One",
    :description => "This is the first project.",
    :users => [users.first()]
  },
  {
    :name => "Project Number Two",
    :description => "This is the second project.",
    :users => [users.first()]
  }
])

bugs = Bug.create([
  {
    :summary => "1.1",
    :description => "First bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "2.1",
    :description => "Second bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "3.1",
    :description => "Third bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "4.1",
    :description => "Forth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "5.1",
    :description => "Fifth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "6.1",
    :description => "Sixth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "7.1",
    :description => "Seventh bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "8.1",
    :description => "Eighth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "9.1",
    :description => "Nineth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
  {
    :summary => "10.1",
    :description => "Tenth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id,
  },
])