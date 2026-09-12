---
title: "Summary and thinking on Bulb Switcher problem"
description: "Bulb Switcher Problem: There are n bulbs that are initially off. You first turn on all the bulbs. Then, you turn off every second bulb. [...]\nThe post Summary and thinking on Bulb Switcher problem appeared first on weijie ou's scratch pad.\n"
date: 2019-10-25T09:30:00.000Z
year: "2019"
month: "10"
day: "25"
routeSlug: "summary-and-thinking-on-bulb-switcher-problem"
categories: ["Tech","algorithm","leetcode"]
---
<h4 class="wp-block-heading">Bulb Switcher</h4>


<p>Problem:</p>


<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>There are n bulbs that are initially off. You first turn on all the bulbs. Then, you turn off every second bulb. On the third round, you toggle every third bulb (turning on if it’s off or turning off if it’s on). For the ith round, you toggle every i bulb. For the nth round, you only toggle the last bulb. Find how many bulbs are on after n rounds.</p></blockquote>


<p>You can find the problem at <a href="https://leetcode.com/problems/bulb-switcher/">https://leetcode.com/problems/bulb-switcher/</a>.</p>


<p>I’m not going to talk about how to actually code the problem here, just want to share how I thought and finally got to the best solution.</p>


<span id="more-15"></span>


<p>The very naive way would be, create an array of length <code>n</code>, then loop through the array <code>n</code> times to switch the bulbs. This will work, but obviously comes with a O(n^2) time complexity. For that, Leetcode will not pass your solution, and we don’t like an algorithm at O(n^2). OK, then there must be something nicer and quicker to do the job. Let’s think about it.</p>


<p>Assume <code>n</code> is big enough, at the first round, we switch all bulbs:</p>


<p>[On, On, On, … , On]</p>


<p>At the second round ,we switch every two bulbs:</p>


<p>[On, Off, On, Off, … , On] (if <code>n</code> is an odd number) [On, Off, On, Off, … , Off] (if <code>n</code> is an even number)</p>


<p>At the third round, we switch every three bulbs:</p>


<p>[On, Off, Off, Off, On, On, On, … , Off] (if n is an odd number and it could be divided by 3) [On, Off, Off, Off, On, On, On, … , On] (if n is an odd number and it could not be divided by 3) [On, Off, Off, Off, On, On, On, … , On] (if n is an even number and it could be divided by 3) [On, Off, Off, Off, On, On, On, … , Off] (if n is an even number and it could not be divided by 3)</p>


<p>Hmmm, cannot get any pattern till now. But we can see, as the count of round goes up, the former part of array will not be touched anymore. Let’s give a position number to all the bulbs, starting from <code>1</code> to <code>n</code>.</p>


<p>[1, 2, 3, …, n]</p>


<p>And switch the words <code>one</code>, <code>two</code>, <code>three</code> to number <code>1</code>, <code>2</code>, <code>3</code> … <code>n</code>. OK, so before the round reaches a particular number (bulb), it could be switched one or more times. After that, it will remain the same status. How can we know how many times will a bulb be switched? A straight idea is to find its divisors.</p>


<p>It is easy to understand that, in this situation, a number (bulb) will only be reached when the count of round is a divisor of it. You could also call it prime factors. For example:</p>


<ul class="wp-block-list"><li>Bulb at position 6 will be switched at 1st, 2nd, 3rd and 6th round.</li><li>Bulb at position 69 will be switched at 1st, 3rd 23th and 69th round.</li></ul>


<p>And so on! Then we know how to calculate the times of a given number is reached. Suppose we have a good algorithm to get all divisors of a number, we can get the solution to the number much more quicker. From this chart, it seems like a number k will have much less number of divisors: <a href="https://www.math.upenn.edu/~deturck/m170/wk2/divisors.html.">https://www.math.upenn.edu/~deturck/m170/wk2/divisors.html.</a> Maybe the average time complexity will decrease to less than O(n/2)? You loop through all numbers and see if the bulb at this position will be on at last. The code looks like:</p>


<p>However, this solution didn’t pass because it is using too much time. So I had to re-think about the algorithm I applied. I thought it about an hour (yes, very long time) and suddenly noticed that the divisors are all in pairs! This is really an a-ha moment for me when solving this problem. Let’s see:</p>


<ul class="wp-block-list"><li>Position 6: divisors are [1, 6], [2, 3]</li><li>Position 69: divisors are [1, 69], [3, 23]</li></ul>


<p>Did you think of anything? When a bulb is toggled twice, it will be off. So the bulb at #6 and #69 will be off at last. They will not be counted into the number of bulbs are on. But there must be some bulbs remain on when the loop is ended. Which numbers? From the above examples, we can see at least position #1 is on. But why it is one? Because it only have one divisor “1”. Just think a little bit deeper, or you have listed enough examples to observe the divisor pairs, you will find out:</p>


<ul class="wp-block-list"><li>Position 9: divisors are [1, 9], [3, 3]</li><li>Position 16: divisors are [1, 16], [2, 8], [4, 4]</li></ul>


<p>A-ha! A bulb at position with a number which is perfect square will survive! That’s the critical point. If you still not getting, let me explain it.</p>


<p>We are looping all the bulbs, skipping one more bulb after every round; Consider every position has its number, it will only be reached when the round number is a divisor of its position number; Divisor appears in pairs, unless the divisor is a square root of the position number; A square root will only be reached once, bulb will be toggled only once at [square root]th round. At all the other rounds, the bulb will be toggled on-then-off.</p>


<p>The conclusion is, only the bulbs at a position which order number is a perfect square, will the bulb be on at last. We just need to find out how many perfect squares are there in range <code>[1, n]</code> (inclusive). The code will look like:</p>


<p><code>def bulbSwitch(self, n): """ :type n: int :rtype: int """ count = 0 i = 1 while i &lt; n + 1: if i ** 2</code></p>


<p>Why stop when <code>i ** 2</code> greater than <code>n</code>? Because you have already found the square roots of all the perfect squares within the range, no need to loop further. So someone even gave better solution: just <code>return int(math.sqrt(n))</code> and this will be the answer.</p>


<p>That’s it. Please leave any comment if you think I’m wrong or you have suggestions for my expressions (as I’m not a native English speaker, just want to make myself more clear on explaining an algorithm problem).</p>
<p>The post <a href="/2019/10/25/summary-and-thinking-on-bulb-switcher-problem/">Summary and thinking on Bulb Switcher problem</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
