module ApplicationHelper

  def get_relative_asset_path
    return controller_name + "/" + action_name
  end

  def favicon_resolutions_link_tag
    sizes = [16, 32, 96, 160, 192]

    html = [favicon_link_tag()]

    favicon_sizes_link_tag("favicon", sizes, "png", {
      :rel => "icon",
      :type => "image/png"
    }, html)
  end

  def apple_touch_icon_link_tag
    rel = "apple-touch-icon"
    sizes = [57, 60, 72, 76, 114, 120, 144, 152, 180]

    html = [tag(:meta, {
      :name => "apple-mobile-web-app-title",
      :content => Rails.configuration.app_name
    })]

    favicon_sizes_link_tag(rel, sizes, "png", {
      :rel => rel
    }, html)
  end

  def windows_icon_link_tag
    attributes = [
      { :name => "application-name", :content => Rails.configuration.app_name },
      { :name => "msapplication-TileColor", :content => Rails.configuration.windows_tile_color },
      { :name => "msapplication-TileImage", :content => "/images/mstile-144x144.png" },
      { :name => "msapplication-config", :content => "/images/browserconfig.xml" }
    ]

    raw(attributes.map { |attribute|
      tag(:meta, attribute)
    }.join())
  end


  private

  def favicon_sizes_link_tag(href_prefix, sizes, format="png", attributes={}, html=[])
    html << sizes.map { |size|
      tag(:link, attributes.merge({
        :href => "/images/#{href_prefix}-#{size}x#{size}.#{format}",
        :sizes => "#{size}x#{size}"
      }))
    }
    raw(html.join())
  end
end
