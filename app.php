<?php
	$uid = isset($_GET["uid"]) ? $_GET["uid"] : "";
	if (strlen($uid) != 40) {
		$uid = isset($_COOKIE["uid"]) ? $_COOKIE["uid"] : "";
		if (strlen($uid) != 40) {
			header("Location: /saveme");
			die();
		}
	}
	$action = isset($_GET["action"]) ? strtolower($_GET["action"]) : "";
	if ($action == "logout") {
		setcookie("uid", null, -1);
		header("Location: /");
		die();
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>PeterPlanner</title>
	<meta name="description" content="PeterPlanner is a course prerequisite tracker and scheduling tool for UCI students." />
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/style.css">
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/jquery-ui-1.12.1.min.css">
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/jquery-weekcalendar.css">
	<link href="echo-caldata-download.php">
	<!--[if IE]><script type="text/javascript" src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
	<script type="text/javascript">
		var uid = <?php echo "\"$uid\""; ?>;
		var selectedClasses = {};
		var classesDict = {};
		var courseColors = {};
		var usedColors = {};
		function toggleSelected(element) {
			if (event !== undefined) {
				event.preventDefault();
			}
			var c = classesDict[element.id];
			var days = 0;
			if (c.days != null) {
				days = c.days.length;
			}
			var isSelected = element.classList.toggle("selected");
			if (isSelected) {
				selectedClasses[element.id] = true;
				if (days > 0) {
					var courseId = c.course.department + c.course.number;
					var timeStart = new Date(c.time.start);
					var timeEnd = new Date(c.time.end);
					if ((event !== undefined) && (event.type != "DOMContentLoaded")) {
						$("#cal").weekCalendar("scrollToHour", timeStart.getUTCHours(), true);
					}
					for (var i = 0; i < days; i++) {
						var title = c.course.department + " " + c.course.number + "<br />" + c.type + " " + c.section + " (" + c.code + ")";
						var day = c.days[i];
						var calEvent = {
							id: element.id + day,
							groupId: element.id,
							courseId: courseId,
							start: new Date(2012, 9, day, timeStart.getUTCHours(), timeStart.getUTCMinutes()),
							end: new Date(2012, 9, day, timeEnd.getUTCHours(), timeEnd.getUTCMinutes()),
							title: title,
						};
						$("#cal").weekCalendar("updateEvent", calEvent);
					}
					var colorPair = courseColors[courseId];
					if (colorPair == undefined) {
						var colorId = -1;
						do {
							colorPair = getRandomColorPair();
							colorId = colorPair.id;
						} while (usedColors[colorId] === true);
						usedColors[colorId] = true;
						courseColors[courseId] = colorPair;
					}
					$(".wc-cal-event").each(function(index, e) {
						var calEvent = $(e).data().calEvent;
						if (calEvent.courseId == courseId) {
							colorEvent(e, colorPair);
						}
					});
				}
			} else {
				delete selectedClasses[element.id];
				for (var i = 0; i < days; i++) {
					var day = c.days[i];
					$("#cal").weekCalendar("removeEvent", element.id + day);
				}
			}
			save(uid, selectedClasses);
			return false;
		}
		function generateCalendarClassData(c) { //c = Class object
			return {'days': c.days, 'starttime': c.time['start'].slice(0, -1), 'endtime': c.time['end'].slice(0, -1), 'title': c.course.department + " " + c.course.number + " " + c.type, 'building': c.place};
		}
		function generateCalendarData() {
			classArray = [];
			for (var c in selectedClasses) {
				classArray.push(generateCalendarClassData(classesDict[c]));
			}
			return classArray;
		}
		function downloadCalendar() {
			document.getElementById('caldata').value = buildICSFileString(generateCalendarData(), sampleSD, sampleED);
			document.forms[0].submit();
		}
	</script>
</head>

<body>
	<nav>
		<a href="/app" class="selected">Home</a>
		<a href="/saveme">Instructions</a>
		<a href="#" onclick="javascript:downloadCalendar()">Export</a>
		<a href="/app?action=logout">Log Out</a>
		<span id="user"></span>
		<a href="/faq" class="info"><img src="assets/vectors/info.svg"></a>
	</nav>
	<section class="flex">
		<div id="cal"></div>
		<div><div id="blocks"></div></div>
	</section>
	<script type="text/javascript" src="assets/scripts/script.js"></script>
	<script type="text/javascript" src="assets/scripts/colors.js"></script>
	<script type="text/javascript" src="assets/scripts/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="assets/scripts/jquery-ui-1.12.1.min.js"></script>
	<script type="text/javascript" src="assets/scripts/jquery-weekcalendar.js"></script>
	<script type="text/javascript" src="assets/scripts/calendar-generator.js"></script>
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
					return $("#blocks").height();
				},
				draggable : function(calEvent, element) { return false; },
				resizable : function(calEvent, element) { return false; },
				eventClick : function(calEvent, element) {
					toggleSelected(document.getElementById(calEvent.groupId));
				}
			});
			$("#cal").weekCalendar("gotoWeek", new Date(2012, 9, 1));
			var stored = get(uid);
			if (stored != null) {
				selectedClasses = stored;
			}
			var earliestHour = Number.POSITIVE_INFINITY;
			for (var cID in selectedClasses) {
				var c = classesDict[cID];
				if (c.days != null) {
					var timeStart = new Date(c.time.start);
					var hour = timeStart.getUTCHours();
					if (hour < earliestHour) {
						earliestHour = hour;
					}
				}
				toggleSelected(document.getElementById(cID));
			}
			if (earliestHour < Number.POSITIVE_INFINITY) {
				$("#cal").weekCalendar("scrollToHour", earliestHour, true);
			}
		});
	</script>
	<form method="post" action="echo-caldata-download.php">
	  <input type="hidden" name="data" id="caldata" value="">
	</form>
</body>
</html>
