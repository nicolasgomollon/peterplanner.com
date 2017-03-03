<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Peter Planner</title>
	<meta name="description" content="Peter Planner is a prerequisite tracker and scheduling tool for UCI students." />
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="assets/stylesheets/style.css">
	<!--[if IE]><script type="text/javascript" src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
	<script type="text/javascript">
		var studentID = <?php echo isset($_GET['studentID']) ? "\"".$_GET['studentID']."\"" : "null" ?>;
		function toggleSelected(element) {
			event.preventDefault();
			element.classList.toggle("selected");
			return false;
		}
	</script>
</head>

<body>
	<div id="blocks" class="blocks"></div>
	<script type="text/javascript" src="assets/scripts/script.js"></script>
</body>
</html>
