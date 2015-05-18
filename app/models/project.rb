class Project < ActiveRecord::Base
  has_many :permissions
  has_many :users, :through => :permissions
  has_many :bugs
  has_attached_file :image,
                    :styles => { :medium => "300x300>", :thumb => "150x150>" },
                    :url => "/system/projects/images/:id/:style",
                    :default_url => "/assets/isometric-cube.svg"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  def image_url
    {
      :thumb => image.url(:thumb),
      :medium => image.url(:medium),
      :original => image.url(:original)
    }
  end
end
