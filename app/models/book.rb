class Book < ApplicationRecord
  mount_uploader :image, ImageUploader

  has_many :wishlists, dependent: :destroy
  has_and_belongs_to_many :authors
  validates_presence_of :title

end
