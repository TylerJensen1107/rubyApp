class PongController < ApplicationController
	require 'json'

	skip_before_action :verify_authenticity_token

	def new
	end

	def index
		@players = Player.all
		@players = @players.sort { |a,b| b.wins <=> a.wins }
		render json: @players
	end

	def create
		@player = Player.new(player_params)

		@player.save
		render json: @player
	end

	def update
		@player = Player.find(params[:id])

		@player.update(player_params)
		render json: @player
	end

	def show
		@player = Player.find(params[:id])
		render json: @player
	end

	private
		def player_params
			params.require(:player).permit(:name, :wins, :losses)
		end

end
