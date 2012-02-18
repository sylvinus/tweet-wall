(function($) {
  $.fn.scroller = function () {
    var list = this;
    list.items = [];
    
    list.push = function(items) {
      items.css('display', 'none').highlight('tulip time').highlight('tuliptime').highlight('tulip_time').highlight('tech embassy').highlight('techembassy');
      items.each(function() {
        list.items.push(this);
      })
    }
    
    list.cleanup = function() {
      if(list.children().length > 30) {
        list.children().slice(0, 15).remove()
      }
    }
    
    var process = function() {
      $(list.items.shift()).appendTo(list).slideDown(5000);
      list.cleanup();
    }
    
    setInterval(process, 5000);
    return list;
  }
  
  $(function() {
    tweets = $('#tweets').scroller();
    flicks = $('#flickr').scroller();
    

    function fetchTweets() {
      if(tweets.items.length < 10) {
        Joshfire.factory.getDataSource("text").find({},function(err,data) {
          $.each(data.entries, function() {  
            tweets.push($('<li><a href="'+this.author[0].url+'"><img class="profile" src="' + this.author[0].image.contentURL + '"/></a><span class="from">' + (this.author[0]["name"] || this.author[0]["foaf:nick"]) + ':</span> ' + inlinePics(this.name) + '</li>'));
          }); 
        });

      }
      setTimeout(fetchTweets, 30000);
    }
    
    function fetchFlicks() {
      if (flicks.items.length < 15) {
        Joshfire.factory.getDataSource("image").find({},function(err,data) {
          $.each(data.entries, function(i,photo){

            flicks.push($('<li><a href="' + photo.url + '"><img src="' + photo.contentURL + '"/></a></li>'));
          });
        });
      }
      window.setTimeout(fetchFlicks, 120000);        
    }
         
    
    function inlinePics(text) {
      return text
        .replace(/http:\/\/twitpic\.com\/([\w\d]+)/, '<img src="http://twitpic.com/show/thumb/$1" class="twitpic">')
        .replace(/http:\/\/yfrog\.com\/([\w\d]+)/, '<img src="http://yfrog.com/$1.th.jpg" class="twitpic">')
        .replace(/http:\/\/pic\.im\/([\w\d]+)/, '<img src="http://pic.im/website/thumbnail/$1" class="twitpic">')
    }
            
    fetchTweets();
    fetchFlicks();
  });
  
})(jQuery)

    
    // window.setInterval(showNext, 7000, '#tweets')
    // window.setInterval(showNext, 4000, '#flickr')
    // function moveit(element) {
    //   var top = $(element).position().top - 100;
    //   $(element).animate({top: top + 'px'}, {duration:5000, easing:'linear',
    //     complete: function() { moveit(element) }});
    // }
    // moveit('#tweets');
