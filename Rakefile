require "rubygems"
require 'rake'
require 'yaml'
require 'time'
require "rake/clean"
require "stringex"

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md"
}

desc 'List available rake tasks'
task :default do
  puts 'Try one of these specific tasks:'
  sh 'rake --tasks --silent'
end

# desc 'deploy to Stanford via rsync and backup'
# task :deploy do
#   puts 'Deploying to Stanford AFS...'
#   # remove --rsh piece if not using 22
#   sh "time jekyll && rsync -rtzh --progress _site/ "
#   puts 'Uploaded to AFS!'
#   puts 'Backing up to Github...'
#   sh "git add -A && git commit -m 'Updates' && git push origin master"
#   puts 'Backed up to Github!'
# end

# Usage: rake page name="about.md"
# You can also specify a sub-directory path.
# If you don't specify a file extension we create an index.html at the path specified
desc "Create a new page."
task :page do
  name = ENV["name"] || "new-page.md"
  filename = File.join(SOURCE, "#{name}")
  filename = File.join(filename, "index.html") if File.extname(filename) == ""
  title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  mkdir_p File.dirname(filename)
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "group: "
    post.puts "title: \"#{title}\""
    post.puts "permalink: "
    post.puts 'description: ""'
    post.puts "---"
  end
end # task :page

desc "New post"
task :write do |t|

  title    = get_stdin("What is the title of your post? ")
  filename = "_posts/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.md"

  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new draft: #{filename}"
  open(filename, "w") do |post|
    post.puts "---"
    post.puts "layout: stanford-post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "categories: "
    post.puts "---"
  end
end

desc "Run the development server."
task :preview do
  sh "jekyll server --watch"
end

desc "Nuke and rebuild."
task :nuke do
    sh 'rm -rf _site'
    system "jekyll build"
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end
