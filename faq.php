<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>PeterPlanner</title>
	<meta name="description" content="PeterPlanner is a course prerequisite tracker and scheduling tool for UCI students." />
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/style.css">
	<!--[if IE]><script type="text/javascript" src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
</head>

<body>
	<nav>
<?php
	$uid = isset($_GET["uid"]) ? $_GET["uid"] : "";
	if (strlen($uid) != 40) {
		$uid = isset($_COOKIE["uid"]) ? $_COOKIE["uid"] : "";
	}
	
	if (strlen($uid) != 40) {
?>
		<a href="/">Home</a>
		<a href="/saveme">Instructions</a>
<?php } else { ?>
		<a href="/app">Home</a>
		<a href="/saveme">Instructions</a>
		<a href="#" onclick="event.preventDefault();">Export</a>
		<a href="/app?action=logout">Log Out</a>
		<span id="user"></span>
<?php } ?>
		<a href="/faq" class="info selected"><img src="assets/vectors/info.svg"></a>
	</nav>
	<section>
		<article>
			<h2 id="what">What is PeterPlanner?</h2>
			<p>PeterPlanner is a course prerequisite tracker and scheduling tool for UCI students. The best way to describe this web app is:</p>
			<p><strong>PeterPlanner</strong> = <strong><a href="https://www.reg.uci.edu/access/student/degreeworks/?seg=U">DegreeWorks</a></strong> + <strong><a href="http://catalogue.uci.edu/">UCI General Catalogue</a></strong> + <strong><a href="https://www.reg.uci.edu/perl/WebSoc/">WebSOC</a></strong> + <strong><a href="https://antplanner.appspot.com/">AntPlanner</a></strong></p>
			<p>Here&rsquo;s a more in-depth list of things PeterPlanner offers over other solutions.</p>
			<ul>
				<p>PeterPlanner:</p>
				<li>Shows the courses that are relevant to you. Rather than searching for each course you are thinking of taking, you are presented with a list (similar to DegreeWorks) of the courses you have already taken and have left to take.</li>
				<li>Lets you know which quarter(s) each particular course has historically been offered, based on the past three years of WebSOC data.</li>
				<li>Lists the prerequisites for each course, tailored to your history of taken courses, so you&rsquo;re only shown the courses <em>you</em> need to take to satisfy those prerequisites.</li>
				<li>Also lists the courses that a particular course is <em>a prerequisite for</em> (the reverse), so you&rsquo;re aware of the courses you&rsquo;ll be able to take once that course is completed.</li>
				<li>Displays full course names and descriptions (from the UCI General Catalogue).</li>
				<li>Is open source, and open to feedback from students to improve.</li>
			</ul>
			<p>In a nutshell, PeterPlanner basically saves you from jumping back and forth between all of these different tools by offering those features all in one place.</p>
		</article>
		<article>
			<h2 id="why">Why PeterPlanner?</h2>
			<p>Most of the other solutions created to improve the course enrollment experience felt lacking in some areas, so PeterPlanner hopes to fill those gaps. Take a look at <em>&ldquo;<a href="#what">What is PeterPlanner?</a>&rdquo;</em> to find out what makes this web app unique.</p>
		</article>
		<article>
			<h2 id="how">How does this work? Is it safe?</h2>
			<p>When clicked, the bookmarklet you install basically takes the cookies from the DegreeWorks page in order to fetch the XML file that DegreeWorks uses behind the scenes. The cookies expire and become unusable after a certain amount of time (set by the UCI login page), so that it&rsquo;s impossible to have access to anything else after that point. Essentially, you&rsquo;re only giving the app a one-time access to your account to fetch this file.</p>
			<p>On top of that, <a href="https://github.com/nicolasgomollon/peterplanner.com">all of the code is available on GitHub</a>, so users are free to see exactly how and where their information is used.</p>
		</article>
		<article>
			<h2 id="who">Who is behind this?</h2>
			<p>PeterPlanner was made by a small group of friends as part of a quarter-long project for In4matx 151 (Project Management). <a href="https://nicolas.gomollon.me/">Nicolas Gomollon</a> is the main person building the web app, with help from <a href="http://andrewmehta.com/">Andrew Mehta</a>, as well as contributors on the various GitHub repositories for this project (<a href="https://github.com/nicolasgomollon/peterplanner.com/graphs/contributors">peterplanner.com</a>, <a href="https://github.com/nicolasgomollon/peterplanner/graphs/contributors">peterplanner</a>, <a href="https://github.com/nicolasgomollon/peterplanner-download/graphs/contributors">peterplanner-download</a>, <a href="https://github.com/nicolasgomollon/peterplanner-parse/graphs/contributors">peterplanner-parse</a>).</p>
		</article>
		<article>
			<h2 id="notupdated">Why aren&rsquo;t my classes updating?</h2>
			<p>If you are currently taking classes and PeterPlanner does not reflect that, you might need to run <a href="https://peterplanner.com/saveme">the bookmarklet</a> again. Once run, the server will fetch a new copy of your profile with the updated data from DegreeWorks.</p>
		</article>
	</section>
</body>
</html>
