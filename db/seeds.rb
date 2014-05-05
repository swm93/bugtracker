# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

permission_types = PermissionType.create([
  {
    :name => "admin",
    :read => 1,
    :write => 1,
  },
  {
    :name => "guest",
    :read => 0,
    :write => 1,
  }
  #in theory we could add another permission_type called blocked where read and write would be 0
  #this should result in the public property being ignored and the user not being able to view the project at all
  #however this would not prevent them from viewing public projects by loggin out
])

permissions = Permission.create([
  {
    :project_id => 1,
    :user_id => 1,
    :permission_type_id => 1
  },
  {
    :project_id => 2,
    :user_id => 1,
    :permission_type_id => 2
  }
])

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
    :public => 1
  },
  {
    :name => "Project Number Two",
    :description => "This is the second project.",
    :public => 0
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
    :reporter_id => users.first().id
  },
  {
    :summary => "2.1",
    :description => "Second bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "3.1",
    :description => "Third bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "4.1",
    :description => "Forth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "5.1",
    :description => "Fifth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "6.1",
    :description => "Sixth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "7.1",
    :description => "Seventh bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "8.1",
    :description => "Eighth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "9.1",
    :description => "Nineth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
  {
    :summary => "10.1",
    :description => "Tenth bug.",
    :project => projects.first(),
    :status => "assigned",
    :priority => "normal",
    :assignee_id => users.first().id,
    :reporter_id => users.first().id
  },
])