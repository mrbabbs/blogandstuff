---
---

$(function() {

  alert("ciao sono io, amore mio");
  
  var postURLs,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = $(".posts").children().length,
      loadNewPostsThreshold = 3000;
  
  // Load the JSON file containing all URLs
  $.getJSON('/assets/js/all-posts.json', function(data) {
    alert("se stai dormendo mi dispiace metto giù");
    postURLs = [];

  //  $.each( data, function( key, val ) {
    for (var i = 0; i < data['posts'].length; i++) {
        postURLs.push(data['posts'][i]['url']);
       console.log(data['posts'][i]);
    };
        
        
  //  });
 
    
    //postURLs = data["posts"];
    console.log("postURL: "+postURLs);
    // If there aren't any more posts available to load than already visible, disable fetching
    if (postURLs.length <= postsToLoad)
      disableFetching();
  });

  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".infinite-spinner").length < 1){
          shouldFetchPosts = false;
          alert("pensavo a noi");

  }

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
    // Exit if postURLs haven't been loaded
    if (!postURLs) return;
    
    isFetchingPosts = true;
    
    // Load as many posts as there were present on the page when it loaded
    // After successfully loading a post, load the next one
    var loadedPosts = 0,
        postCount = $(".post").length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;
                // alert("dimmi cos'hai "+postCount);


          if (postIndex > postURLs.length-1) {
            disableFetching();
            return;
          }

          if (loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };

    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = postURLs[index];

    $.get(postURL, function(data) {
      var a = $(data).find(".post");
      alert("sei stata zitta tutto il tempo in pizzeria "+a.contents());
      console.log(a);
      a.appendTo(".cbp_tmtimeline");
      callback();
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }

});