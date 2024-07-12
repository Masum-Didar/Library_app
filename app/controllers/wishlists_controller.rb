class WishlistsController < ApplicationController
  before_action :set_book

  def create
    @wishlist = @book.wishlists.create
    respond_to do |format|
      format.html { redirect_to books_path }
      format.turbo_stream
    end
  end

  def destroy
    @wishlist = @book.wishlists.find(params[:id])
    @wishlist.destroy
    respond_to do |format|
      format.html { redirect_to books_path }
      format.turbo_stream
    end
  end

  private

  def set_book
    @book = Book.find(params[:book_id])
  end
end
