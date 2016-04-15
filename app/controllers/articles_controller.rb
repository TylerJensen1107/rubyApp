class ArticlesController < ApplicationController
	def new
	end

	def index
		@articles = Article.all
	end

	def create
		@article = Article.new(article_params)

		@article.save
		render json: article_params
	end

	def show
		@article = Article.find(params[:id])
		render json: @article
	end

	private
		def article_params
			params.require(:article).permit(:title, :text)
		end

end
