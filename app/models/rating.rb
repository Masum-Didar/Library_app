class Rating < ApplicationRecord
  belongs_to :book
  validates :rating, presence: true, inclusion: { in: 1..5 }
end
