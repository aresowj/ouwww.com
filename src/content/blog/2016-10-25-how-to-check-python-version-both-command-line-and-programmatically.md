---
title: "How to check Python version (both command-line and programmatically)"
date: 2016-10-25T05:39:00.000Z
year: "2016"
month: "10"
day: "25"
routeSlug: "how-to-check-python-version-both-command-line-and-programmatically"
categories: ["Tech","python"]
---
<p>Sometimes you might want to confirm if your program will run / is running under Python 2.x or 3.x. We have a very simple way to do the stuff.</p>


<span id="more-18"></span>


<h4 class="wp-block-heading">Command Line Method</h4>


<p>It is really easy to confirm a Python version using the option &#8211;version of the interpreter.</p>


<pre class="wp-block-code"><code>ares$ python --version Python 2.7.10
ares$ python3 --version Python 3.5.1</code></pre>


<p>You can also start the interpreter, and see the version information in the welcome message.</p>


<pre class="wp-block-code"><code>ares$ python
Python 2.7.10 (default, Sep 23 2015, 04:34:21)
[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.0.72)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>></code></pre>


<h2 class="wp-block-heading">Programmatically Check</h2>


<p>You can also check the version on-the-fly when your program runs. Just a short piece of code:</p>


<pre class="wp-block-code"><code>import sys # if it is Python2.x is_py2=(sys.version_info[0] == 2) # if it is Python3.x is_py3=(sys.version_info[0] == 3)</code></pre>


<p>By integrating the two values, you can check the current running environment and implement compatibility stuffs, such as <code>__unicode__()</code> and <code>__str__()</code> for Python 2.</p>


<p>Let’s take a close look at what <code>sys.version_info</code> returns:</p>


<pre class="wp-block-code"><code>>>> import sys
>>> sys.version_info
sys.version_info(major=2, minor=7, micro=10, releaselevel='final', serial=0)
>>></code></pre>
<p>The post <a href="/2016/10/25/how-to-check-python-version-both-command-line-and-programmatically/">How to check Python version (both command-line and programmatically)</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
