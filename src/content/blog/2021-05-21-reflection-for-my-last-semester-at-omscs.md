---
title: "Reflection for My Last Semester at OMSCS"
date: 2021-05-21T19:12:22.000Z
year: "2021"
month: "05"
day: "21"
routeSlug: "reflection-for-my-last-semester-at-omscs"
categories: ["Thoughts","computer science","georgia tech","master degree","omscs"]
---
<h1>Introduction</h1>
<p>Spring 2021 was my last semester in the master program at Georgia Tech. I chose to push my limit and elected two courses:</p>
<ul>
<li>6515 Graduate Introduction to Algorithms</li>
<li>7210 Distributed Computing</li>
</ul>
<p>The second course is new on OMSCS. Nobody has elected this one before, we are literally the first batch of students to test the course.</p>
<p>It turns out the course is excellent and my passion on distributed systems aligns with the contents very well.</p>
<h1>Course Contents</h1>
<p>Let&#8217;s first see what are included in syllabus:</p>
<ul>
<li>Introduction to Distributed Systems</li>
<li>Primer of RPC</li>
<li>Time in Distributed Systems</li>
<li>State in Distributed Systems</li>
<li>Consensus</li>
<li>PAXOS and Friends</li>
<li>Replication</li>
<li>Fault-tolerance</li>
<li>Distributed Transactions</li>
<li>Consistency and Geo-Distributed Data Stores</li>
<li>Peer-to-peer, Mobility</li>
<li>Distributed Data Analytics</li>
<li>Distributed Machine Learning</li>
<li>Support for Datacenter-based Distributed Computing</li>
<li>Byzantine Fault Tolerance, Blockchain</li>
<li>Edge Computing, IoT</li>
</ul>
<p>The course covers a large range of theory and real-life practices in distributed systems. While it starts from fundamentals, it also goes up to the latest edge development of the industry, including graduate level topics like consensus, replication and fault-tolerance etc.</p>
<p>For the suggested readings, you can find classical articles and industry showcases from the companies running the largest distributed (and geo-distributed) systems in the world. Some examples:</p>
<ul>
<li>Raynal and M. Singhal. Logical Time: A Way to Capture Causality in Distributed Systems (Links to an external site.). IRISA Technical Report. (up to Section 7)</li>
<li>Lamport, Time, Clocks and The Ordering of Events in Distributed Systems</li>
<li>Spanner: Google’s Globally-Distributed Database</li>
<li>Scaling Memcache at Facebook</li>
<li>Gaia: Geo-Distributed Machine Learning Approaching LAN Speeds</li>
</ul>
<p>One of the hottest topics &#8211; machine learning &#8211; is also adapted in this course in a DS fashion. You will learn in a geo-distributed scenario, what are the advanced ways to make sure the learning system is working at most efficiency, utilizing compute power globally.</p>
<h1>Projects</h1>
<p>Well, I would say this course has the most hardcore projects among all the ones I studied in the program. It is even much harder than those in 8803 Compiler. You will be asked to implement a bunch of things which are critical components/concepts of a distributed system:</p>
<ul>
<li>Key-value stores</li>
<li>PAXOS consensus</li>
<li>View server</li>
<li>State transition and consistency in distributed system</li>
<li>Two-phase commit</li>
<li>Distributed transaction</li>
<li>Async message delivery in distributed system</li>
</ul>
<p>Projects are kind of related as one would be the base of another, especially for project 4 and 5.</p>
<p>The only complaint I have is the instructions, which can be improved to state the project intent and requirements much better. Most time I struggle understanding what should be done and what is the expected way to do it.</p>
<p>There are a bunch of tests running on GradeScope to evaluate your implementation. Two types of tests to expect: The RUN tests and SEARCH tests. Search test is a relatively new concept to me. The test code is not checking if the input/output are valid, but walking through the STATEs that your program can reach and see if any invariant violation. The concept reminds me something learnt in CS6340 Software Analysis and Test, which tests for invariants of code block, loops and branches.</p>
<p>The search test can be very difficult to pass reliably if the logic of the implementation is not or near to perfect. Any edge case, including super trivial ones, will be caught when the test walks into a state that is violating any assumption. Compare to run tests, search tests is very efficient in finding missed edge cases, along with the DSLab framework, to wrap everything in-memory (including I/O operations).</p>
<p>Difficulty of projects increases tremendously after Project 3 (as of Spring 2021). The first two are quite straightforward and simple, if you have some exposure to software engineering. You implement a basic key-value store, extending the provided interface and base <code>Application</code> class. After that, PAXOS comes into play and you are going to scratch (to the ground) your head for over 50 hours to implement the famous consensus protocol from Lamport&#8217;s thesis <a href="https://lamport.azurewebsites.net/pubs/paxos-simple.pdf"><em>Paxos Made Simple</em></a>. Well it feels like the &#8220;How to draw an owl meme&#8221;:</p>
<p><img fetchpriority="high" decoding="async" class="alignnone wp-image-50 size-full" src="/wp-content/uploads/2021/05/how-to-draw-an-owl.jpg" alt="" width="500" height="407" srcset="/wp-content/uploads/2021/05/how-to-draw-an-owl.jpg 500w, /wp-content/uploads/2021/05/how-to-draw-an-owl-300x244.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" /></p>
<p>For sure, you will learn A LOT at the end, when you finish all five projects. It&#8217;s okay if you cannot get full score in all of them, I did not in the last one. Still, learn by coding is a good approach for studying distributed system, and computer science.</p>
<h1>Conclusion</h1>
<p>By striving through the course, I firmly believe that my passion is with Distributed Systems and I want to continue this journey. Go deep and go wide, that&#8217;s what I will be trying to do.</p>
<p>I strongly recommend anyone who is interested in the topics to take this class, it is well-organized, content rich, with good support from the professor and TAs. The topics are not stale, you could even leverage most of things you learnt in your job, if you work in the cloud industry.</p>
<p>Also applied to be an TA in this course, see you in Fall 2021.</p>
<p>The post <a href="/2021/05/21/reflection-for-my-last-semester-at-omscs/">Reflection for My Last Semester at OMSCS</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
