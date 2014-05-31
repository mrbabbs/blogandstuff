---
---
$(function() {
  
  var page = 2,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      loadNewPostsThreshold = 200,
      path = "page",
      paginate = {{ site.paginate }},
      posts = [ {% for post in site.posts %}
                "{{ post.url }}"{% unless forloop.last %},{% endunless %}
              {% endfor %},],
      pages = posts.length / paginate + 1;
      url = window.location.href+path;
  
  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".infinite-spinner").length < 1)
    shouldFetchPosts = false;

  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(function(e){

    if (!shouldFetchPosts || isFetchingPosts) return;

    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();

    // If we've scrolled past the loadNewPostsThreshold, fetch posts
     if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });
  
  // Fetch a chunk of posts
  function fetchPosts() {
    isFetchingPosts = true;
    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    var callback = function(disable) {
          page++;
          if(page > pages)
            disableFetching();
          
          
          isFetchingPosts = false;
          
        };
    
    
    fetchPostWithIndex(page, url, callback);
  }

  function fetchPostWithIndex(page, url, callback) {
    var postURL = url+page+"/",
        disable = false;

    $.get(postURL, function(data) {
        
      $(data).appendTo(".cbp_tmtimeline");
      callback();
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }

});
