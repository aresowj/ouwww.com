---
title: "JavaScript (jQuery AngularJS) Notes"
description: "Better way to compare two floats When you compare two floats, you’d better not directly compare them. Because in the calculation handled by computer, some [...]\nThe post JavaScript (jQuery AngularJS) Notes appeared first on weijie ou's scratch pad.\n"
date: 2019-10-25T05:54:00.000Z
year: "2019"
month: "10"
day: "25"
routeSlug: "javascript-jquery-angularjs-notes"
categories: ["Tech","javascript"]
---
<h4 class="wp-block-heading">Better way to compare two floats</h4>


<p>When you compare two floats, you’d better not directly compare them. Because in the calculation handled by computer, some minor difference will be introduced into infinities. Try to compare floats if they are equal using:</p>


<pre class="wp-block-code"><code>Math.abs(1 / 3 - (1 - 2 / 3)) &lt; 0.0000001; // true</code></pre>


<span id="more-17"></span>


<h4 class="wp-block-heading">Convert data to a particular format</h4>


<p><code>toLocaleString()</code> is good for converting a number to formatted string. You do not need to implement any extra methods yourself, JavaScript has done this for you. For example, you have some price to show in a table, you want to display it in USD currency format, just one line:</p>


<pre class="wp-block-code"><code>// Displays "128,000,000" if in U.S. English locale
var price = 128000000; console.log(price.toLocaleString());</code></pre>


<h4 class="wp-block-heading">Comparing with <code>==</code> and <code>===</code></h4>


<p>Try to compare with <code>===</code> but not <code>==</code>. <code>==</code> will convert the variable for comparison, <code>===</code> will only compare when the two comparators are the same type. Using <code>===</code> can avoid some unexpected behavior.</p>


<p>However, there is one exception. <code>NaN === NaN</code> will always return <code>False</code>. The only way to judge if a variable is to use <code>isNaN()</code></p>


<h4 class="wp-block-heading">Dynamic Binding</h4>


<p>The event handlers can only bind to static elements if you use <code>$(selector).eventHandler(...)</code>.</p>


<p>Try to use <code>$(document).on('eventName', handler(){...}?</code> to bind elements that are dynamically generated.</p>


<h4 class="wp-block-heading">.next(selector)</h4>


<p>Will only give you the next sibling, but not finding the next available element for you.</p>


<p>That is, if the next element is not matching selector, it will return empty. Without a selector, it will just give you the next element in DOM tree.</p>


<p>If you want to find anything in all the siblings, use <code>.nextAll(selector)</code> instead.</p>
<p>The post <a href="/2019/10/25/javascript-jquery-angularjs-notes/">JavaScript (jQuery AngularJS) Notes</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
