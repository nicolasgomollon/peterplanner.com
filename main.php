<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Peter Planner</title>
<style>
a 
{
	color: black;
	text-decoration: none;
}
div.classblock
{
	background-color: #0064a4;
	padding: 1px;
	border-radius: 10px;
}
p.blocktext
{
	font-weight: bold;
	font-family: 'Arial', sans-serif;
}
</style>
<script type="text/javascript">
	var studentID = <?php echo isset($_GET['studentID']) ? "\"".$_GET['studentID']."\"" : "null" ?>;
</script>
<script src="classes.js"></script>
<script type="text/javascript">
	function switchClass(direction, title)
	{
		//Direction: 1 is adding the class, 0 is dropping it
		if (direction)
		{
			c = getAvailableClass(title);
			addEnrolledClass(c.title, c.code, c.prof, c.tooltipdata);
			removeAvailableClass(title);
		}
		else
		{
			c = getEnrolledClass(title);
			addAvailableClass(c.title, c.code, c.prof, c.tooltipdata);
			removeEnrolledClass(title);
		}
		refreshData();
	}
	function writeContentBlock(classArray, section)
	{
		//Section: 0 is available, 1 is selected
		result = '';
		for (c in classArray)
		{
			result += '<a href="javascript:switchClass(' + section + ', \'' + classArray[c].title + '\')"><div align="center" class="classblock"><p class="blocktext">' + classArray[c].title + ' (' + classArray[c].code + ')<br><br>' + classArray[c].prof + '</p></div></a><br />';
		}
		return result;
	}
	function refreshData()
	{
		document.getElementById("availcontent").innerHTML = writeContentBlock(availableClasses, 1);
		document.getElementById("enrolledcontent").innerHTML = writeContentBlock(enrolledClasses, 0);
	}
	availableClasses = masterlist;
</script>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</head>

<body style="margin: 0px;padding: 0px">
	<div width="100%" style="background-color: #0064A4; height:30px;" align="right"><img style="padding-top:5px;padding-right: 5px" src="info.png" width="20px"></div>
	<div style="float:left;padding-right: 50px;padding-left:30px;border-right: 1px solid #000000;">
	  <p style="font-size:32px;font-family: 'Open Sans', sans-serif;">Available Classes</p>
		<div id="availcontent">Please Enable Javascript</div>
	</div>
	<div style="float: left;padding-left: 70px;">
		<p style="font-size:32px;font-family: 'Open Sans', sans-serif;">Selected Classes</p>
		<div id="enrolledcontent">Please Enable Javascript</div>
	</div>
	<script type="text/javascript">
		document.getElementById("availcontent").innerHTML = writeContentBlock(availableClasses, 1);
		document.getElementById("enrolledcontent").innerHTML = writeContentBlock(enrolledClasses, 0);
	</script>
</body>
</html>
