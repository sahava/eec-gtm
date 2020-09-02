eec-gtm
=======

DOM scraping scripts for tracking content with Enhanced Ecommerce with Google Tag Manager.

<h3>Tags</h3>

<h4>Custom HTML</h4>
These can be found in the tags folder of this repository. Remember to modify them so that they match your content.
<strong>EEC - HTML - Compile impressions</strong>

* Trigger 1: DOM Ready
* Trigger 2: EEC - Impression click

<strong>EEC - HTML - Checkout Funnel and scroll tracking</strong>

* Trigger: EEC - Page is an article

<h4>Universal Analytics</h4>
<strong>EEC - Event - Add To Cart</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Add To Cart
* Enable Enhanced Ecommerce Features: Checked
* Use data layer: Checked
* Trigger: EEC - addToCart

<strong>EEC - Event - Checkout</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Checkout
* Enable Enhanced Ecommerce Features: Checked
* Use data layer: Checked
* Trigger: EEC - checkout

<strong>EEC - Event - Product Click</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Product Click
* Enable Enhanced Ecommerce Features: Checked
* Use data layer: Checked
* Trigger: EEC - productClick

<strong>EEC - Event - Product Detail Impression</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Product Detail Impression
* Non-Interaction: True
* Enable Enhanced Ecommerce Feature: Checked
* Use data layer: Checked
* Trigger: EEC - productDetail

<strong>EEC - Event - Product Impressions</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Product Impressions
* Non-Interaction: True
* Enable Enhanced Ecommerce Feature: Checked
* Use data layer: Checked
* Trigger: EEC - impressionsPushed

<strong>EEC - Event - Purchase</strong>

* Tag Type: Event
* Event Category: Ecommerce
* Event Action: Purchase
* Enable Enhanced Ecommerce Feature: Checked
* Use data layer: Checked
* Trigger: EEC - purchase

<h3>Variables</h3>

<h4>Custom JavaScript</h4>
These can be found in the variables folder of this repository. Remember to modify them, so they work on your site!

<strong>EEC - Impression click TRUE</strong>

<strong>EEC - Words in text price</strong>

<h4>Data Layer</h4>
<strong>EEC - Post type</strong>

* This variable should return the post type of the page
* This is used in the trigger for the Checkout plugin, since it should only fire if the page is an article page

<h3>Triggers</h3>

<h4>Custom Event</h4>

<strong>EEC - checkout</strong>
* Event name to match: checkout
* All Events
 
<strong>EEC - impressionsPushed</strong>

* Event name to match: impressionsPushed
* All Events

<strong>EEC - productClick</strong>

* Event name to match: productClick
* All Events

<strong>EEC - productDetail</strong>

* Event name to match: productDetail
* All Events

<strong>EEC - purchase</strong>

* Event name to match: purchase
* All Events

<strong>EEC - addToCart</strong>

* Event name to match: addToCart
* All Events
 
<h4>Page View</h4>

<strong>EEC - Page is an article</strong>

* Filter 1: {{EEC - Post type}} equals single-post
* Trigger Type: DOM Ready

<h4>Link Click</h4>

<strong>EEC - Impression click</strong>

* Tag filter: {{EEC - Impression click TRUE}} equals true
* Listener filter: {{Page URL}} matches RegEx .*
