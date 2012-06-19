Encoding.default_internal = 'UTF-8'
require 'rubygems'
require 'bundler/setup'
Bundler.require

set :public_folder, File.dirname(__FILE__) + '/assets'

get "/"  do
	erb :index
end