---
title: "Compile &#038; install 32 bit Python 2.7 on 64 bit CentOS 6.5"
date: 2019-10-25T06:00:00.000Z
year: "2019"
month: "10"
day: "24"
routeSlug: "compile-install-32-bit-python-2-7-on-64-bit-centos-6-5"
categories: ["Tech","centos","devops","python"]
---
<p>You might want to compile a version of Python other than shipped one on your CentOS system. For example, running a Python script using a library that only has a 32bit build. Here are the steps on how to compile &amp; install Python 2.7.12 from source code on CentOS 6.5. All operations tested on a clean CentOS 6.5 (AWS AMI: <em>CentOS 6.5 x86_64(HVM) — 20141008–0 — minimal install with cloud helpers plus Intel SRIOV (ami-4dc28f7d)</em>)</p>


<span id="more-16"></span>


<p>Firstly, prepare your system for development and compilation:</p>


<p><code>sudo yum groupinstall "Development tools"</code></p>


<p>Please note that you might receive “Group Development tools does not exist” warning if you don’t have proper repositories. Try to install EPEL, CentOS-base or other necessary repositories. Also remember to setup proxies on if your server is in an internal network, otherwise <code>yum</code> will not work to get external resources.</p>


<p>Then, install the libraries required for compiling Python. As we are compiling a 32bit application on a 64bit system, we need to grab 32bit version of all these libraries. On CentOS 6, append ‘.i686’ to the package name for 32bit versions.</p>


<p><code>sudo yum install glibc-devel.i686 glibc-devel zlib-devel.i686 bzip2-devel.i686 openssl-devel.i686 ncurses-devel.i686 sqlite-devel.i686 readline-devel.i686 tk-devel.i686 gdbm-devel.i686 db4-devel.i686 libX11-devel.i686</code></p>


<p>Note that <code>libX11</code> library will be installed by <code>tkinter</code> but not <code>libX11-devel</code>, so we have to install it separately. Now download satisfied version of Python from <a href="https://www.python.org/">python.org</a>. Let’s say put it in your home directory.</p>


<p><code>wget [https://www.python.org/ftp/python/2.7.12/Python-2.7.12.tar.xz](https://www.python.org/ftp/python/2.7.12/Python-2.7.12.tar.xz)</code></p>


<p>Unzip it:</p>


<p><code>unxz Python-2.7.12.tar.xz tar xf Python-2.7.12.tar</code></p>


<p>OK, we are set to start the compilation process. Change directory:</p>


<p><code>cd Python-2.7.12</code></p>


<p>Create a folder for your Python installation:</p>


<p><code>mkdir /opt/python-2.7.12.i686</code></p>


<p>Configure the compile:</p>


<p><code>BASECFLAGS=-m32 LDFLAGS=-m32 CFLAGS=-m32 ./configure --prefix=/opt/python-2.7.12.i686 --enable-shared</code></p>


<p>The <code>-prefix</code> option allows you to install Python in a custom location (instead of <code>/usr/local</code>); <code>--enable-shared</code> option tells <code>make</code> to build both static and dynamic Python libraries. The <code>-m32</code> flags tells the compiler to use 32bit libraries for building. By default, gcc will use 64bit libraries on a 64bit platform.</p>


<p>Make the Python source files:</p>


<p><code>make</code></p>


<p>Search any library if the <code>make</code> failed on some modules (though it should not happen). You can ignore <code>bsddb185</code> and <code>sunaudiodev</code> if you don’t need them. But other modules should be built for a complete functioning Python installation. From <a href="https://gist.github.com/reorx/4067217">https://gist.github.com/reorx/4067217</a> we know these libraries are undocumented or deprecated:</p>


<ul class="wp-block-list"><li><code>bsddb185</code>: Older version of Oracle Berkeley DB. Undocumented. Install version 4.8 instead.</li><li><code>dl</code>: For 32-bit machines. Deprecated. Use ctypes instead.</li><li><code>imageop</code>: For 32-bit machines. Deprecated. Use PIL instead.</li><li><code>sunaudiodev</code>: For Sun hardware. Deprecated.</li><li><code>_tkinter</code>: For tkinter graphy library, unnecessary if you don’t develop tkinter programs.</li></ul>


<p>Another consideraion is, there a bug in ffi.c in Python source code. When I was compiling, make returned an error message like this:</p>


<p><code>/opt/python-3.4.2/Python-3.4.2/Modules/_ctypes/libffi/src/x86/ffi.c:679: undefined reference to `ffi_closure_FASTCALL' /usr/bin/ld: build/temp.linux-x86_64-3.4/opt/python-3.4.2/Python-3.4.2/Modules/_ctypes/libffi/src/x86/ffi.o: relocation R_386_GOTOFF against undefined hidden symbol `ffi_closure_FASTCALL' can not be used when making a shared object</code></p>


<p>This will prevent you from successfully building <code>_ctypes</code> module. Through a little bit search, I found out this is caused by the mixed definition of calls for different platforms (x86 and x64). Some awesome guys provided a patch at <a href="https://bugs.python.org/issue23042">https://bugs.python.org/issue23042</a>. Read through the patch file (<a href="https://bugs.python.org/file39321/ffi.patch">https://bugs.python.org/file39321/ffi.patch</a>) and fix the logic in your <code>ffi.c</code>. In my case, I just need to move one line of <code>#ifdef X86_WIN32</code> upper, before the line <code>else if (cif-&gt;abi == FFI_FASTCALL)</code> near line 678.</p>


<p>After make is succeed, install Python binary into the folder we created before:</p>


<p><code>make install altinstall</code></p>


<p>The <code>altinstall</code> option make sure the new installation will not replace the current version shipped with your system. Now let’s head to the installation folder and run the new built Python:</p>


<p><code>cd /opt/python-2.7.12.i686/bin ./python</code></p>


<p>You might encounter this error message when starting up:</p>


<p><code>libpython2.7.so.1.0: cannot open shared object file: No such file or directory</code></p>


<p>Modify your <code>LD_LIBRARY_PATH</code>, add <code>/opt/python-2.7.12.i686/lib</code> to this environment variable:</p>


<p><code>export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/python-2.7.12.i686/lib</code></p>


<p>You will want to save this export statement into your own bash configure file (usually <code>~/.bashrc</code>) to make the change permanent. I also suggest to create a virtualenv for the new Python installation for further use.</p>


<h4 class="wp-block-heading">REFERENCES</h4>


<p><a href="https://www.iram.fr/IRAMFR/GILDAS/doc/html/gildas-python-html/node36.html">https://www.iram.fr/IRAMFR/GILDAS/doc/html/gildas-python-html/node36.html</a></p>


<p><a href="http://shouro.blogspot.com/2013/07/compile-python27-on-centos-6.html">http://shouro.blogspot.com/2013/07/compile-python27-on-centos-6.html</a></p>


<p><a href="https://bugs.python.org/issue23042">https://bugs.python.org/issue23042</a></p>
<p>The post <a href="/2019/10/24/compile-install-32-bit-python-2-7-on-64-bit-centos-6-5/">Compile &amp; install 32 bit Python 2.7 on 64 bit CentOS 6.5</a> appeared first on <a href="/">weijie ou&#039;s scratch pad</a>.</p>
