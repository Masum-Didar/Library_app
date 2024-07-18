class AddColumnsFromRating < ActiveRecord::Migration[7.1]
  def change
    add_column :ratings, :value, :integer
  end
end
