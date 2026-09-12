---
title: "Debugging “403 Forbidden” Error Accessing Files on Apache 2"
description: "Recently I was trying to play around with some WordPress plugins, that brought my attention to the console and discovered there have been JavaScript errors [...]\nThe post Debugging “403 Forbidden” Error Accessing Files on Apache 2 appeared first on weijie ou's scratch pad.\n"
date: 2022-01-21T05:19:06.000Z
year: "2022"
month: "01"
day: "20"
routeSlug: "debugging-403-forbidden-error-accessing-files-on-apache-2"
categories: ["Tech","apache","devops","hosting","javascript","web"]
---
<p>Recently I was trying to play around with some WordPress plugins, that brought my attention to the console and discovered there have been JavaScript errors for my site:</p>



<pre class="wp-block-preformatted">GET /wp-includes/js/dist/vendor/lodash.min.js?ver=4.17.19 net::ERR_ABORTED 403 (Forbidden)</pre>



<p>Looking at the site errors logged by Apache, it shows:</p>



<pre class="wp-block-preformatted">[Thu Jan 13 01:50:48.844763 2022] [access_compat:error] [pid 18887] [client 50.47.132.16:60932] <strong>AH01797: client denied by server configuration:</strong> /var/www/html/aresou.net/public_html/wp-includes/js/dist/vendor/lodash.min.js, referer: /wp-admin/index.php</pre>



<p>Weird enough, this error only happens on admin pages, not on the front pages or posts. The first thing I did is to check the folder and file permissions within the WordPress installation. Apache might be unable to serve the static file because <code>www-data</code> account cannot read that file or folder.</p>



<p>Nothing suspicious after checking that. I even set folders to 755 and files to 644 with <code>chmod</code>. Seems like the problem isn&#8217;t in the file system. Having done a bit more research, I realized that the next possible cause is the Apache site configurations.</p>



<p>I have three sites on my host, serving two blogs (one of them is aresou.net, aka this site you&#8217;re reading) and one personal wiki. The wiki shares the same root domain with this blog. First I reviewed the <code>&lt;Directory></code> sections of the configs for the two sites with their own domains. Everything looks good, there was no permission restricted from either root or sub folders. Apache should not be blocking access to these folders.</p>



<p>As the wiki site is sharing the same root domain with this blog, I did not think of checking the config. Well, this is the worst assumption I had in the debugging. With more research, I found a line somewhere saying &#8220;Apache will combine directives from all enabled site configurations when loading&#8221;. To be precise, let me quote from Apache official documentation:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Directives in the configuration files may apply to the entire server, or they may be restricted to apply only to particular directories, files, hosts, or URLs. This document describes how to use configuration section containers or <code>.htaccess</code> files to change the scope of other configuration directives.</p><cite><a href="https://httpd.apache.org/docs/2.4/sections.html">https://httpd.apache.org/docs/2.4/sections.html</a></cite></blockquote>



<p>Which means, any directives from any site config file will be applied to the whole server, if it is not restricted to a particular scope. I immediately went back and checked the config for my wiki site. There were a few lines blocking access for some folders, but not everywhere:</p>



<pre class="wp-block-preformatted">...
Require all denied
...
Order allow,deny
Deny from all
Satisfy All</pre>



<p>They are for protecting data folders in DokuWiki, specifically for Apache older than version 2.4. The config is copied directly from <a href="https://www.dokuwiki.org/security#deny_directory_access_in_apache">their official documentation</a>. Then I noticed another few lines:</p>



<pre class="wp-block-preformatted">&lt;LocationMatch "(data|conf|bin|inc|<strong>vendor</strong>)/">
    Order allow,deny
    Deny from all
    Satisfy All
&lt;/LocationMatch></pre>



<p>The &#8220;vendor&#8221; regex keyword immediately caught my eyes. Recall that the forbidden JavaScript file is placed under somewhat &#8220;/vendor/&#8221; folder. Also, this <code>&lt;LocationMatch></code> section lays at the top level without scope restriction, meaning it will be applied by Apache to the whole server, even though it is only configured within one site.</p>



<p>It&#8217;s easy to fix the problem if knowing the root cause. By adding a prefix in the match regex, the forbidden error in WordPress went away and the admin page is again working like a charm.</p>



<pre class="wp-block-preformatted">&lt;LocationMatch "<strong>/wiki/</strong>(data|conf|bin|inc|vendor)/">
    Order allow,deny
    Deny from all
    Satisfy All
&lt;/LocationMatch></pre>



<p>It is also possible to fix this by adding new directives introduced from Apache 2.4, without using <code>&lt;LocationMatch></code>:</p>



<pre class="wp-block-preformatted">&lt;Directory /usr/share/dokuwiki/data>
        Require all denied
        ## FOR VER APACHE2.4

        ## Add other directories one by one
&lt;/Directory></pre>



<p>Hope this article can save someone a bit of time. It took me almost 2 hours to figure out what was going on. Have a good day!</p>
<p>The post <a href="/2022/01/20/debugging-403-forbidden-error-accessing-files-on-apache-2/">Debugging &#8220;403 Forbidden&#8221; Error Accessing Files on Apache 2</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
