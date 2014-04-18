=begin
  
  Category plugin, read a template from file 

=end 

module Jekyll
  class CategoryGenerator < Generator

    def generate(site)
      categories = {}
      mappings = {}
      site.categories.keys.each do |k|            # create a mapping to change the keys
        mappings[k] = k.gsub(" ","-")+".html" 
      end
      site.categories = Hash[site.categories.map {|k, v| [mappings[k], v] }]
      site.categories.each do |category|
        category[1].each do |post|
          if categories.has_key?(category[0])
            categories[category[0]] << {"url"=>post.url, "title"=>post.title,"date"=>post.date,"content"=>post.content}
          else
            categories[category[0]] = [{"url"=>post.url, "title"=>post.title,"date"=>post.date,"content"=>post.content}]
          end            
        end
        input = site.source + $cat_template
        output = site.source + $cat_folder + category[0]
        self.copy_template(input,output)              # create a file for each category in the $cat_folder        
        site.pages <<  CategoryPage.new(site, site.source, $cat_folder, category[0], categories[category[0]])  
      end
    end

    # Copy the whole file "input" in the file "output"
    def copy_template(input, output)
      file = File.open(input, "r")
      f = File.open(output,"w")
      while (line = file.gets)
        f.write(line)
      end
      f.close
      file.close
    end

  end

=begin
  Inherits the Page class due to add an available variable in every category page
=end
  class CategoryPage < Page
    def initialize(site, base, dir, name, category)
      super(site, base, dir, name)
      self.data['category'] = category
    end
  end     
end
