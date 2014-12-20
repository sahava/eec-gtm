/* EEC - Words in text price
*
*  Custom JavaScript Variable, which returns number of words in
*  the article.
*
*  Originally from LunaMetrics:
*
*  http://www.lunametrics.com/blog/2014/01/24/classify-blog-posts-analytics-content-groupings/
*
*  This variable is configured for WordPress with the Sixteen
*  Nine theme. This script is running on www.simoahava.com
*  where you can debug how it works, using the JS console. */

function() {
  var texts = document.getElementsByClassName("entry-content")[0];
  var wordCountTemp = texts.textContent || texts.innerText;
  wordCountTemp = wordCountTemp.replace(/(^\s*)|(\s*$)/gi,"");
  wordCountTemp = wordCountTemp.replace(/[ ]{2,}/gi," ");
  wordCountTemp = wordCountTemp.replace(/\n /,"\n");
  var wordCount = wordCountTemp.split(' ').length;
  return (wordCount - 1) + '.99';
}