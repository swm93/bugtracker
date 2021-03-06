# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


permissions = Permission.create([
  {
    project_id: 1,
    user_id: 1,
    access: :write
  },
  {
    project_id: 2,
    user_id: 1,
    access: :read
  }
])

users = User.create([
  {
    name: "Scott Mielcarski",
    email: "scott_mielcarski@me.com",
    password: "password"
  },
  {
    name: "Test",
    email: "test@test.com",
    password: "password"
  }
])

users.each { |u| u.activate }

projects = Project.create([
  {
    name: "Project Number One",
    description: "This is the first project.",
    public: 1,
    image: nil
  },
  {
    name: "Project Number Two",
    description: "This is the second project.",
    public: 0,
    image: nil
  }
])

bugs = Bug.create([
  {
    number: 1,
    summary: "1.1",
    description: "First bug.",
    project: projects.first(),
    status: "assigned",
    priority: "high",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 2,
    summary: "2.1",
    description: "Second bug.",
    project: projects.first(),
    status: "resolved",
    priority: "high",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 3,
    summary: "3.1",
    description: "Third bug.",
    project: projects.first(),
    status: "investigate",
    priority: "normal",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 4,
    summary: "4.1",
    description: "Forth bug.",
    project: projects.first(),
    status: "investigate",
    priority: "low",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 5,
    summary: "5.1",
    description: "Fifth bug.",
    project: projects.first(),
    status: "assigned",
    priority: "normal",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 6,
    summary: "6.1",
    description: "Sixth bug.",
    project: projects.first(),
    status: "investigate",
    priority: "normal",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 7,
    summary: "7.1",
    description: "Seventh bug.",
    project: projects.first(),
    status: "resolved",
    priority: "low",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 8,
    summary: "8.1",
    description: "Eighth bug.",
    project: projects.first(),
    status: "resolved",
    priority: "high",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 9,
    summary: "9.1",
    description: "Nineth bug.",
    project: projects.first(),
    status: "resolved",
    priority: "normal",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
  {
    number: 10,
    summary: "10.1",
    description: "Tenth bug.",
    project: projects.first(),
    status: "assigned",
    priority: "high",
    assignee_id: users.first().id,
    reporter_id: users.first().id
  },
])