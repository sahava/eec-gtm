/* EEC - Impression click TRUE
*
*  Custom JavaScript Variable, which returns 'true', if gtm.linkClick
*  is registered on an product impression list item.
*
*  This variable is configured for WordPress with the Sixteen
*  Nine theme. This script is running on www.simoahava.com
*  where you can debug how it works, using the JS console. */

function() {
  if ({{Click Element}}.parentElement.className.indexOf('rpwe') > -1 || {{Click Element}}.parentElement.parentElement.id === 'recentcomments' || {{Click Element}}.parentElement.parentElement.parentElement.tagName === 'ARTICLE' || {{Click Element}}.parentElement.parentElement.parentElement.parentElement.id === 'recent-posts-2') {
    return 'true';
  }
  return 'false';
}