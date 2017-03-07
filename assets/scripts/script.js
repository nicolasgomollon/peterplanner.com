function dataFor(uid) {
	var query = "";
	if ((uid == null) || (uid == undefined) || (uid.length != 40)) {
		return JSON.parse("{}");
	} else {
		query = "?uid=" + uid + "&json=1";
	}
	var url = "https://peterplanner.com/launch" + query;
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);
	return JSON.parse(request.responseText);
}

function blocksFor(student) {
	if ((student.terms == null) || (student.terms == undefined)) {
		return [];
	}
	var blocks = [];
	var yearTerm = student.terms[0];
	for (var i = 0; i < student.blocks.length; i++) {
		var block = student.blocks[i];
		var availableCourses = [];
		for (var j = 0; j < block.rules.length; j++) {
			var rule = block.rules[j];
			for (var k = 0; k < rule.requirements.length; k++) {
				var req = rule.requirements[k];
				if (req.completed.length >= req.required) {
					continue
				}
				for (var l = 0; l < req.options.length; l++) {
					var option = req.options[l];
					var course = student.courses[option];
					var title = course.department + " " + course.number;
					if (course.classes != null) {
						var classes = course.classes[yearTerm];
						if ((classes != undefined) && clearedPrereqs(course, student)) {
							availableCourses.push(course);
							for (var m = 0; m < classes.length; m++) {
								var c = classes[m];
								c.course = course;
								classesDict[c.code] = c;
							}
						}
					}
				}
			}
		}
		blocks.push({title: block.title, courses: availableCourses})
	}
	return blocks;
}

function cmpGrade(grA, grB) {
	if ((grA.length == 0) && (grB.length == 0)) {
		return 0;
	} else if (grA.length == 0) {
		return Number.NEGATIVE_INFINITY;
	} else if (grB.length == 0) {
		return Number.POSITIVE_INFINITY;
	}
	
	var cmpGrA = grA;
	cmpGrA = cmpGrA.replace("+", "");
	cmpGrA = cmpGrA.replace("-", "");
	cmpGrA = cmpGrA.toUpperCase();
	
	var cmpGrB = grB;
	cmpGrB = cmpGrB.replace("+", "");
	cmpGrB = cmpGrB.replace("-", "");
	cmpGrB = cmpGrB.toUpperCase();
	
	var comparison = 0;
	if (cmpGrA == cmpGrB) {
		var grAplus = grA.includes("+");
		var grAminus = grA.includes("-");
		
		var grBplus = grB.includes("+");
		var grBminus = grB.includes("-");
		
		if (grAplus && !grBplus) {
			comparison = -1;
		} else if (!grAplus && grBplus) {
			comparison = 1;
		} else if (!grAminus && grBminus) {
			comparison = -1;
		} else if (grAminus && !grBminus) {
			comparison = 1;
		}
	} else if (cmpGrA < cmpGrB) {
		comparison = -1;
	} else if (cmpGrA > cmpGrB) {
		comparison = 1;
	}
	
	return comparison;
}

function clearedPrereqs(course, student) {
	var numPrereqs = course.prerequisites;
	if (numPrereqs == null) {
		numPrereqs = 0;
	} else {
		numPrereqs = numPrereqs.length;
	}
	for (var i = 0; i < numPrereqs; i++) {
		var prereqsAND = course.prerequisites[i];
		var satisfied = false;
		for (var j = 0; j < prereqsAND.length; j++) {
			var prereqOR = prereqsAND[j];
			if (!satisfied) {
				var splitPrrq = prereqOR.split("|");
				var prereq = splitPrrq[0].replace(/\s/g , "");
				satisfied = (student.taken[prereq] !== undefined);
				if (!satisfied && splitPrrq[0].startsWith("NO ")) {
					prereq = prereq.slice(2);
					satisfied = !student.taken[prereq];
				} else if (satisfied && (splitPrrq.length == 2)) {
					var c = student.courses[prereq];
					var grade = splitPrrq[1];
					if ((c.grade.length != 0) && (grade.length != 0)) {
						if (cmpGrade(c.grade, grade) > 0) {
							satisfied = false;
						}
					}
				}
				if (satisfied) {
					break;
				}
			}
		}
		if (!satisfied) {
			return false;
		}
	}
	return true;
}

function weekdays(day) {
	switch (day) {
	case 0:
		return "Su";
	case 1:
		return "M";
	case 2:
		return "Tu";
	case 3:
		return "W";
	case 4:
		return "Th";
	case 5:
		return "F";
	case 6:
		return "Sa";
	default:
		return "";
	}
}

function twelveHours(h) {
	return (h == 12) ? 12 : (h % 12);
}

function meridiem(h) {
	return (h >= 12) ? "p" : "";
}

function zeroPad(m) {
	return ("00" + m).substr(-2);
}

function htmlForCourse(course) {
	var courseHTML = '<div class="course">';
	courseHTML += '<h1>'+ course.department + ' ' + course.number + ': ' + course.title + '</h1>';
	var description = course.description;
	if (description != undefined) {
		courseHTML += '<p>' + course.description + '</p>';
	}
	courseHTML += '<div class="title">';
	{
		courseHTML += '<div class="code">Code</div>';
		courseHTML += '<div class="type">Type</div>';
		courseHTML += '<div class="sec">Sec</div>';
		courseHTML += '<div class="instructor">Instructor</div>';
		courseHTML += '<div class="days">Days</div>';
		courseHTML += '<div class="time">Time</div>';
		courseHTML += '<div class="place">Place</div>';
	}
	courseHTML += '</div>';
	for (var j = 0; j < course.classes["2017-14"].length; j++) {
		var c = course.classes["2017-14"][j];
		var timeStart = new Date(c.time.start);
		var timeEnd = new Date(c.time.end);
		courseHTML += '<a id="' + c.code + '" class="class" href="#" onclick="return toggleSelected(this);">';
		{
			courseHTML += '<div class="code">' + c.code + '</div>';
			courseHTML += '<div class="type">' + c.type + '</div>';
			courseHTML += '<div class="sec">' + c.section + '</div>';
			courseHTML += '<div class="instructor">' + c.instructor + '</div>';
			courseHTML += '<div class="days">' + c.days.map(weekdays).join("") + '</div>';
			courseHTML += '<div class="time">';
			{
				courseHTML += '<span class="start">' + twelveHours(timeStart.getUTCHours()) + ':' + zeroPad(timeStart.getUTCMinutes()) + '</span>';
				courseHTML += '<span class="meridiem">' + meridiem(timeStart.getUTCHours()) + '</span>';
				courseHTML += '<span class="sep">-</span>';
				courseHTML += '<span class="end">' + twelveHours(timeEnd.getUTCHours()) + ':' + zeroPad(timeEnd.getUTCMinutes()) + '</span>';
				courseHTML += '<span class="meridiem">' + meridiem(timeEnd.getUTCHours()) + '</span>';
			}
			courseHTML += '</div>';
			courseHTML += '<div class="place">' + c.place + '</div>';
		}
		courseHTML += '</a>';
	}
	courseHTML += '</div>';
	courseHTML += '<div class="separator"></div>';
	return courseHTML;
}

function htmlForCourses(courses) {
	var coursesHTML = "";
	for (var i = 0; i < courses.length; i++) {
		coursesHTML += htmlForCourse(courses[i]);
	}
	return coursesHTML;
}

function htmlForBlock(block) {
	var blockHTML = '<div class="block">';
	blockHTML += '<h1>' + block.title + '</h1>';
	blockHTML += '<div id="courses" class="courses">';
	blockHTML += htmlForCourses(block.courses);
	blockHTML += '</div>';
	blockHTML += '</div>';
	return blockHTML;
}

function htmlForBlocks(blocks) {
	var blocksHTML = "";
	for (var i = 0; i < blocks.length; i++) {
		blocksHTML += htmlForBlock(blocks[i]);
	}
	return blocksHTML;
}

function printBlocks(blocks) {
	document.getElementById("blocks").innerHTML = htmlForBlocks(blocks);
}

var student = dataFor(uid);
var blocks = blocksFor(student);
printBlocks(blocks);
