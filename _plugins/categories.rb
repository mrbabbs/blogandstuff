=begin
  
  Category plugin, read a template from file 

=end 

$cat_folder = "/categories/"                    # categories folder
$template = "/_layouts/categories.html"          # filename of the template (to put in $cat_folder)


module Jekyll
  class ArchivesGenerator < Generator

    def generate(site)
      categories = {}      
      site.categories.each do |category|
        category[1].each do |post|
          if categories.has_key?(category[0])
            categories[category[0]] << {"url"=>post.url, "title"=>post.title}
          else
            categories[category[0]] = [{"url"=>post.url, "title"=>post.title}]
          end            
        end
      end
      site.categories.each do |category|              # for each category write it in the proper file
        input = site.source + $template
        output = site.source + $cat_folder + category[0]+".html"
        self.copy_template(input,output)              # create a file for each category in the $cat_folder
        curr = category[0]+".html"        
        site.pages <<  CategoryPage.new(site, site.source, $cat_folder, curr, categories[category[0]])  
      end
    end

=begin
  Copy the whole file "input" in the file "output"
=end
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
