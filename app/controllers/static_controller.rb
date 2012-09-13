class StaticController < ActionController::Base
  def index

  end

  def connect
    render :json => { :frog => 1 }.to_json, :callback => params[:callback]
  end
end
