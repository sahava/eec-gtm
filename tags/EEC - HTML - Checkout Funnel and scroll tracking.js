<script>
  /* EEC - HTML - Checkout Funnel and scroll tracking
  *
  *  Custom HTML Tag, which pushes a dataLayer object
  *  which handles the whole checkout funnel using Justin Cutroni's
  *  scroll tracking script.
  *
  *  http://cutroni.com/blog/2014/02/12/advanced-content-tracking-with-universal-analytics/
  *
  *  This tag is configured for WordPress with the Sixteen
  *  Nine theme. This script is running on www.simoahava.com
  *  where you can debug how it works, using the JS console. 
  *
  *  jQuery is required for this plugin to work. 
  *
  *  Also, you need a Custom JavaScript Variable "EEC - Words in text price",
  *  which returns the number of words in the article. */
  
  <script>
  jQuery(function($) {
    // Build the article into a product object first
    var titleElement = document.getElementsByClassName('entry-title')[0];
    var productName = titleElement.textContent || titleElement.innerText;
    productName = productName.trim();
    var product = [{
        'name' : pName,
        'id' : pName.replace(/ /g, '').replace(/[^\w]+/g, ''),
        'price' : {{EEC - Words in text price}},
        'category' : {{Page Path}}.split('/')[1],
        'quantity' : 1
    }];

    // Default time delay before checking location
    var callBackTime = 100;

    // # px before tracking a reader
    var readerLocation = 150;

    // Set some flags for tracking & execution
    var timer = 0;
    var scroller = false;
    var oneThird = false;
    var twoThirds = false;
    var endContent = false;
    var didComplete = false;
    var purchase = false;
    
    // Content area DIV class
    var contentArea = 'entry-content';

    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;
    
    // Get some information about the current page
    var pageTitle = document.title;

    // Track the aticle load as a Product Detail View
    dataLayer.push({
      'event' : 'productDetail',
      'ecommerce' : {
        'detail' : {
          'products' : product
        }
      }
    });

    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();

        // If user starts to scroll send an event
        if (bottom > readerLocation && !scroller) {
          dataLayer.push({
            'event' : 'addToCart',
            'ecommerce' : {
              'add' : {
                'products' : product
              }
            }
          });
          scroller = true;
        }
        
        // If one third is reached
        if (bottom >= ($(contentArea).scrollTop() + $(contentArea).innerHeight() / 3) && !oneThird) {
          dataLayer.push({
            'event' : 'checkout',
            'ecommerce' : {
              'checkout' : {
                'actionField' : { 'step' : 1 },
                'products' : product
              }
            }
          });
          oneThird = true;
        }
      
        // If two thirds is reached
        if (bottom >= ($(contentArea).scrollTop() + $(contentArea).innerHeight() / 3 * 2) && !twoThirds) {
          dataLayer.push({
            'event' : 'checkout',
            'ecommerce' : {
              'checkout' : {
                'actionField' : { 'step' : 2 },
                'products' : product
              }
            }
          });
          twoThirds = true;
        }

        // If user has hit the bottom of the content send an event
        if (bottom >= $(contentArea).scrollTop() + $(contentArea).innerHeight() && (!endContent || !purchase)) {
            if (!endContent) {
              dataLayer.push({
                'event' : 'checkout',
                'ecommerce' : {
                  'checkout' : {
                    'actionField' : { 'step' : 3 },
                    'products' : product
                  }
                }
              });
              endContent = true;
            }
        }
      
        // If user has reached end of funnel, check if 60 seconds is passed
        if (endContent && !purchase) {
          currentTime = new Date();
          contentScrollEnd = currentTime.getTime();
          timeToContentEnd = Math.round((contentScrollEnd - scrollStart) / 1000);
          if (timeToContentEnd > 60 && !purchase) {
            dataLayer.push({
              'event' : 'purchase',
              'ecommerce' : {
                'purchase' : {
                  'actionField' : {
                    'id' : new Date().getTime() + '_' + Math.random().toString(36).substring(5),
                    'affiliation' : 'Simo Ahava\'s Blog',
                    'revenue' : {{EEC - Words in text price}}
                  },
                  'products' : product
                }
              }
            });
            purchase = true;
          }
        }
    }

    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }

        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});
</script>