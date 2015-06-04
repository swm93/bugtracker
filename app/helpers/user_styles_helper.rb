module UserStylesHelper

  def user_stylesheet_link_tag(*options)
    path = Rails.public_path.join(user_styles_path(:scss))
    options[0] = user_styles_filename if File.exist?(path)

    stylesheet_link_tag(*options)
  end

  def add_user_styles(user_styles={})
    return unless (self.try(:session).try(:user_id).present?)
    user_scss = compile_erb(user_styles_template_path, user_styles).to_s
    app_scss = File.open(Rails.root.join("app", "assets", "stylesheets", "application.scss"), "rb").read
    # css = compile_scss("#{user_scss}#{app_scss}")

    File.open(Rails.public_path.join(user_styles_path(:scss)), 'w') { |f|
      f.write("#{user_scss}#{app_scss}")
    }
  end

  def compile_erb(template, variables)
    ActionView::Base.new(Rails.application.assets.paths).render({
      partial: template,
      locals: {
        variables: variables
      },
      formats: :scss
    })
  end

  def compile_scss(scss)
    context = Rails.application.assets.context_class.new(
      env,
      user_styles_path(:css),
      Rails.root.join(user_styles_path(:css))
    )

    Sass::Engine.new(scss, {
      syntax: :scss,
      style: Rails.env.development? ? :nested : :compressed,
      load_paths: env.paths,
      sprockets: {
        context: context,
        environment: env
      }
    }).render
  end


  private

  def user_styles_path(ext="")
    "system/user/styles/#{user_styles_filename(ext)}" if user_styles_filename
  end

  def user_styles_filename(ext="")
    ext = ".#{ext}" unless ext.empty?
    "application_#{session[:user_id]}.#{ext}" if session[:user_id].present?
  end

  def user_styles_template_path
    "templates/user.scss.erb"
  end

  def env
    if (Rails.application.assets.is_a?(Sprockets::Index))
      Rails.application.assets.instance_variable_get('@environment')
    else
      Rails.application.assets
    end
  end
end