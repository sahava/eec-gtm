<script>
  /* EEC - HTML - Compile impressions
  *
  *  Custom HTML Tag, which pushes a dataLayer object
  *  with all visible product list impressions and 
  *  and product list clicks. 
  *
  *  This tag is configured for WordPress with the Sixteen
  *  Nine theme. This script is running on www.simoahava.com
  *  where you can debug how it works, using the JS console. */
  
  // RegEx for tag folders, category folders, and paginated home page
  var home = /^\/(tag\/|category\/|page\/|$)/;
  // Regex for search query parameter
  var searchQuery = /^s=/;
  // HTML Class for article headings in product lists
  var headingClass = 'entry-title';
  // HTML Element for the first sidebar widget title
  var recents = document.getElementsByClassName('widgettitle')[2];
  // HTML Element for the second sidebar widget UL
  var recentcoms = document.getElementById('recentcomments');
  // HTML Element for third sidebar widget UL
  var gtmtips = document.getElementsByClassName('rpwe-ul')[0];

  var list, entries, i, len, iText, iLink, recents, recentposts, recentcomments, gtmposts;
  var productImpressions = [];
  var promotions = [];

  // Write the impressions after the DOM has loaded
  if ({{Event}} === 'gtm.dom') {
    if (home.test({{Page Path}})) {
      if (/^\/tag\//.test({{Page Path}})) {
        list = 'Tag posts';
      } else if (/^\/category\//.test({{Page Path}})) {
        list = 'Category posts';
      } else if (searchQuery.test({{URL Query}})) {
        list = 'Search results';
      } else {
        list = 'Main posts';
      }
      entries = document.getElementsByClassName(headingClass);
      
      /* For each article heading on the page, build the impression
      *  object. I use the heading to build the id and name, and
      *  I use the WP category to get the category.*/
      for (i = 0, len = entries.length; i < len; i += 1) {
        iText = entries[i].textContent || entries[i].innerText;
        iText = iText.trim();
        productImpressions.push({
          'id' : iText.replace(/ /g, '').replace(/[^\w]+/g, ''),
          'name' : iText,
          'category' : /category-([^\s]+)/.exec(entries[i].parentElement.parentElement.className)[1],
          'list' : list,
          'position' : i + 1
        });
      }
    }
    recentposts = recents.parentElement.children[1].children;
    for (i = 0, len = recentposts.length; i < len; i += 1) {
      iText = recentposts[i].textContent || recentposts[i].innerText;
      iText = iText.trim();
      productImpressions.push({
        'id' : iText.replace(/ /g, '').replace(/[^\w]+/g, ''),
        'name' : iText,
        'category' : recentposts[i].children[0].href.split('/')[3],
        'list' : 'Recent posts',
        'position' : i + 1
      });
    }
    recentcomments = recentcoms.children;
    for (i = 0, len = recentcomments.length; i < len; i += 1) {
      iLink = recentcomments[i].children[1];
      iText = iLink.textContent || iLink.innerText;
      iText = iText.trim();
      productImpressions.push({
        'id' : iText.replace(/ /g, '').replace(/[^\w]+/g, ''),
        'name' : iText,
        'category' : iLink.href.split('/')[3],
        'list' : 'Recent comments',
        'position' : i + 1
      });
    }
    gtmposts = gtmTips.children;
    for (i = 0, len = gtmposts.length; i < len; i += 1) {
      iText = gtmposts[i].children[0].children[0].textContent || gtmposts[i].children[0].children[0].innerText;
      iText = iText.trim();
      productImpressions.push({
        'id' : iText.replace(/ /g, '').replace(/[^\w]+/g, ''),
        'name' : iText,
        'category' : gtmposts[i].children[0].children[0].href.split('/')[3],
        'list' : 'GTM Tips',
        'position' : i + 1
      });
    }
    // Push the impressions object with an 'impressionsPushed' event
    dataLayer.push({
      'ecommerce' : {
        'impressions' : productImpressions
      },
      'event' : 'impressionsPushed'
    });
  // Register clicks on product list impressions  
  } else if ({{Event}} === 'gtm.linkClick') {
    if (/^\/tag\//.test({{Page Path}})) {
      list = 'Tag posts';
    } else if (/^\/category\//.test({{Page Path}})) {
      list = 'Category posts';
    } else if (/^s=/.test({{URL Query}})) {
      list = 'Search results';
    } else {
      list = 'Main posts';
    }
    if ({{Click Element}}.parentElement.parentElement.parentElement.tagName === 'ARTICLE') {
      dataLayer.push({
        'event' : 'productClick',
        'ecommerce' : {
          'click' : {
            'actionField' : { 'list' : list },
            'products' : [{
              'name' : {{Click Text}},
              'id' : {{Click Text}}.replace(/ /g, '').replace(/[^\w]+/g, ''),
              'category' : {{Click Element}}.href.split('/')[3]
            }]
          }
        }
      });
    } else if ({{Click Element}}.parentElement.parentElement.parentElement.parentElement.id === 'recent-posts-2') {
      dataLayer.push({
        'event' : 'productClick',
        'ecommerce' : {
          'click' : {
            'actionField' : { 'list' : 'Recent posts' },
            'products' : [{
              'name' : {{Click Text}},
              'id' : {{Click Text}}.replace(/ /g, '').replace(/[^\w]+/g, ''),
              'category' : {{Click Element}}.href.split('/')[3]
            }]
          }
        }
      });
    } else if ({{Click Element}}.parentElement.parentElement.id === 'recentcomments') {
      dataLayer.push({
        'event' : 'productClick',
        'ecommerce' : {
          'click' : {
            'actionField' : { 'list' : 'Recent comments' },
            'products' : [{
              'name' : {{Click Text}},
              'id' : {{Click Text}}.replace(/ /g, '').replace(/[^\w]+/g, ''),
              'category' : {{Click Element}}.href.split('/')[3]
            }]
          }
        }
      });
    } else if ({{Click Element}}.parentElement.className.indexOf('rpwe') > -1) {
      dataLayer.push({
        'event' : 'productClick',
        'ecommerce' : {
          'click' : {
            'actionField' : { 'list' : 'GTM Tips' },
            'products' : [{
              'name' : {{Click Text}},
              'id' : {{Click Text}}.replace(/ /g, '').replace(/[^\w]+/g, ''),
              'category' : {{Click Element}}.href.split('/')[3]
            }]
          }
        }
      });
    }
  }
</script>