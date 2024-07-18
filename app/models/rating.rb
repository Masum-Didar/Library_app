class Rating < ApplicationRecord
  belongs_to :book
  validates :value, presence: true, inclusion: { in: 1..5 }
end
