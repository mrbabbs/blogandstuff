$(function() {
  
  var page = 2,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      loadNewPostsThreshold = 200,
      path = "page";
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
          if(disable)
            disableFetching();
          
          page++;
          isFetchingPosts = false;
          
        };
    
    
    fetchPostWithIndex(page, url, callback);
  }

  function fetchPostWithIndex(page, url, callback) {
    var postURL = url+page+"/",
        disable = false;

    $.get(postURL, function(data) {

      if($(data).children().size()< 1)
        disable = true;
        
      $(data).appendTo(".cbp_tmtimeline");
      callback(disable);
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
    console.log("end");
  }

});
