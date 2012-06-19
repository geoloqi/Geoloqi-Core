ENV['RACK_ENV'] ||= 'development'
Encoding.default_internal = 'UTF-8'
require 'rubygems'
require 'bundler/setup'
Bundler.require

namespace :compass do
	desc "Watch Compass project in `/assets` for changes"
	task :watch do
		`bundle exec compass watch ./assets`
	end
	
	desc "Compile Compass project in `/assets`"
	task :compile do
		`bundle exec compass compile ./assets`
	end

end

desc "Build Compass project `/assets`"
task "compass:build" => "compass:compile"
