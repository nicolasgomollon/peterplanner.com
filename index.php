<?php
	$uid = isset($_GET["uid"]) ? $_GET["uid"] : "";
	if (strlen($uid) != 40) {
		$uid = isset($_COOKIE["uid"]) ? $_COOKIE["uid"] : "";
		if (strlen($uid) != 40) {
			header("Location: /saveme");
			die();
		}
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Peter Planner</title>
	<meta name="description" content="Peter Planner is a prerequisite tracker and scheduling tool for UCI students." />
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/style.css">
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="https://antplanner.appspot.com/static/css/jquery.weekcalendar.css">
	<!--[if IE]><script type="text/javascript" src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
	<script type="text/javascript">
		var uid = <?php echo "\"$uid\""; ?>;
		var classesDict = {};
		function toggleSelected(element) {
			event.preventDefault();
			var c = classesDict[element.id];
			var isSelected = element.classList.toggle("selected");
			if (isSelected) {
				var timeStart = new Date(c.time.start);
				var timeEnd = new Date(c.time.end);
				$("#cal").weekCalendar("scrollToHour", timeStart.getUTCHours(), true);
				for (var i = 0; i < c.days.length; i++) {
					var title = c.course.department + " " + c.course.number + "<br />" + c.type + " " + c.section + " (" + c.code + ")";
					var day = c.days[i];
					var calEvent = {
						id: element.id + day,
						groupId: element.id,
						start: new Date(2012, 9, day, timeStart.getUTCHours(), timeStart.getUTCMinutes()),
						end: new Date(2012, 9, day, timeEnd.getUTCHours(), timeEnd.getUTCMinutes()),
						title: title,
					};
					$("#cal").weekCalendar("updateEvent", calEvent);
				}
				groupColorize();
			} else {
				for (var i = 0; i < c.days.length; i++) {
					var day = c.days[i];
					$("#cal").weekCalendar("removeEvent", element.id + day);
				}
			}
			return false;
		}
	</script>
</head>

<body>
	<div id="cal"></div>
	<div id="blocks" class="blocks"></div>
	<script type="text/javascript" src="assets/scripts/script.js"></script>
    <script type="text/javascript" src="assets/scripts/colors.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
	<script src="https://antplanner.appspot.com/static/js/jquery.weekcalendar.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#cal").weekCalendar({
				businessHours: {start: 6, end: 24, limitDisplay: true},
				timeFormat: "h:ia",
				timeSeparator: " - ",
				showHeader: false,
				showColumnHeaderDate: false,
				timeslotsPerHour: 4,
				daysToShow:5,
				readonly: true,
				useShortDayNames: true,
				allowCalEventOverlap: true,
				overlapEventsSeparate: true,
				buttons: false,
				height: function($calendar){
					return $(window).height();
				},
				draggable : function(calEvent, element) { return false; },
				resizable : function(calEvent, element) { return false; },
				eventClick : function(calEvent, element) {
					toggleSelected(document.getElementById(calEvent.groupId));
				}
			});
			$("#cal").weekCalendar("gotoWeek", new Date(2012, 9, 1));
		});
	</script>
</body>
</html>
