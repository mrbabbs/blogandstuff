---
---
$(function() {
  
  var page = 2,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      loadNewPostsThreshold = 250, // customized
      tmp = "{{ site.['paginate_path'] }}",
      path = tmp.split(":")[0];
      paginate = {{ site.paginate }},
      numPosts = {{ site.posts | size }}
      pages = numPosts / paginate;

      if((numPosts % paginate) > 0)
        pages++;

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
  
  // Fetch a page of posts
  function fetchPosts() {
    isFetchingPosts = true;

    // check if there are pages to load
    var callback = function(disable) {
          page++;
          if(page > pages)
            disableFetching();
          
          isFetchingPosts = false;
        };
    fetchPostWithIndex(page, url, callback);
  }

  // load preview pages to append
  function fetchPostWithIndex(page, url, callback) {
    var postURL = url+page+"/",
        disable = false;

    $.get(postURL, function(data) {
        
      $(data).appendTo(".cbp_tmtimeline");
      callback();
    });
  }
  
  // disable fetching page
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }

});
