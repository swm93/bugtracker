class UserMailer < ActionMailer::Base
  layout 'email'
  default from: "bugtrackerapplication@gmail.com"


  def welcome_email(user)
    @user = user
    @url = confirm_email_url(user.confirm_token)
    mail(to: @user.email, subject: "Welcome to BugTracker!")
  end

  def confirmation_email(user)
    @user = user
    mail(to: @user.email, subject: "Confirmation Email")
  end

  def invitation_email(email)

  end


  private

  def confirm_email_url(token)
    "#{root_url}#/users/confirm_email/#{token}"
  end
end
