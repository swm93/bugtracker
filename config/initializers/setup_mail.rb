ActionMailer::Base.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  domain: "gmail.com",
  user_name: ENV["EMAIL_USERNAME"],
  password: ENV["EMAIL_PASSWORD"],
  authentication: :login
}