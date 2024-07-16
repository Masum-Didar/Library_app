class BooksController < ApplicationController
  before_action :set_book, only: %i[show edit update destroy]

  def index
    @books = Book.order(created_at: :desc).page(params[:page]).per(10)
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end


  # def index
  #   @books = Book.order(created_at: :desc).page(1).per(15)
  # end

  # def index_lazy
  #   @books = Book.order(created_at: :desc).page(params[:page]).per(15)
  #   respond_to do |format|
  #     format.html # if you want to render HTML
  #     format.turbo_stream
  #   end
  # end

  def show
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to books_url, notice: "Book was successfully created." }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
        format.turbo_stream { render :form_update, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to books_url, notice: "Book was successfully updated." }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
        format.turbo_stream { render :form_update, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @book.destroy!

    respond_to do |format|
      format.html { redirect_to books_url, notice: "Books was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :image, author_ids: [])
  end
end
