class RatingsController < ApplicationController
  before_action :set_book
  before_action :set_rating, only: [:update]

  def create
    @rating = @book.ratings.create(rating_params)
    respond_to do |format|
      format.html { redirect_to books_url }
      format.turbo_stream
    end
  end

  def update
    @rating.update(rating_params)
    respond_to do |format|
      format.html { redirect_to books_url }
      format.turbo_stream
    end
  end

  private

  def set_book
    @book = Book.find(params[:book_id])
  end

  def set_rating
    @rating = @book.ratings.find(params[:id])
  end

  def rating_params
    params.require(:rating).permit(:value)
  end
end



# class RatingsController < ApplicationController
#   before_action :set_book
#
#   def create
#     @rating = @book.ratings.new(rating_params)
#     respond_to do |format|
#       if @rating.save
#         format.turbo_stream
#         format.html { redirect_to @book, notice: 'Rating was successfully created.' }
#       else
#         format.turbo_stream { render turbo_stream: turbo_stream.replace(dom_id(@rating), partial: "ratings/form", locals: { rating: @rating }) }
#         format.html { render :new }
#       end
#     end
#   rescue => e
#     logger.error "Failed to create rating: #{e.message}"
#     # format.html { redirect_to @book }
#   end
#
#   private
#
#   def set_book
#     @book = Book.find(params[:book_id])
#   rescue ActiveRecord::RecordNotFound
#     redirect_to books_path, alert: 'Book not found.'
#   end
#
#   def rating_params
#     params.require(:rating).permit(:rating)
#   end
# end
