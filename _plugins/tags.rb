=begin
  
  tag plugin, read a template from file 

=end 

$tag_folder = "/tags/"                        # tags folder
$tag_template = "/_layouts/tags.html"          # filename of the template (to put in $cat_folder)


module Jekyll
  class TagsGenerator < Generator
    def generate(site)
      tags = {}      
      site.tags.each do |tag|
        tag[1].each do |post|
          if tags.has_key?(tag[0])
            tags[tag[0]] << {"url"=>post.url, "title"=>post.title}
          else
            tags[tag[0]] = [{"url"=>post.url, "title"=>post.title}]
          end            
        end
      end
      site.tags.each do |tag|              # for each tag write it in the proper file
        curr = tag[0].gsub(" ","-")
        input = site.source + $tag_template
        output = site.source + $tag_folder + curr
        self.copy_template(input,output)              # create a file for each tag in the $cat_folder
        site.pages <<  TagPage.new(site, site.source, $tag_folder, curr, tags[tag[0]])  
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


#  Inherits the Page class due to add an available variable in every tag page

  class TagPage < Page
    def initialize(site, base, dir, name, tag)
      super(site, base, dir, name)
      self.data['tag'] = tag
    end
  end     
end
