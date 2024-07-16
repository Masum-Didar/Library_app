# app/controllers/ratings_controller.rb
class RatingsController < ApplicationController
  before_action :set_book

  def create
    Rails.logger.info "Parameters received: #{params.inspect}"
    @rating = @book.ratings.new(rating_params)
    respond_to do |format|
      if @rating.save
        format.turbo_stream
        format.html { redirect_to @book, notice: 'Rating was successfully created.' }
      else
        format.turbo_stream { render turbo_stream: turbo_stream.replace(dom_id(@rating), partial: "ratings/form", locals: { rating: @rating }) }
        format.html { render :new }
      end
    end
  end

  private

  def set_book
    @book = Book.find(params[:book_id])
  end

  def rating_params
    params.require(:rating).permit(:value)
  end
end
