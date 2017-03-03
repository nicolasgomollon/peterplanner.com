function dataFor(studentID) {
	if ((studentID == null) || (studentID == undefined) || (studentID.length < 8)) {
		return JSON.parse("{}");
	}
	var url = "https://peterplanner.com/launch?studentID=" + studentID + "&json=1";
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);
	return JSON.parse(request.responseText);
}

function availableCoursesFor(student) {
	if ((student.terms == null) || (student.terms == undefined)) {
		return [];
	}
	var availableCourses = [];
	var yearTerm = student.terms[0];
	for (var i = 0; i < student.blocks.length; i++) {
		var block = student.blocks[i];
		for (var j = 0; j < block.requirements.length; j++) {
			var req = block.requirements[j];
			for (var k = 0; k < req.options.length; k++) {
				var option = req.options[k];
				var course = student.courses[option];
				var title = course.department + " " + course.number;
				if (course.classes != null) {
					var classes = course.classes[yearTerm];
					if ((classes != undefined) && clearedPrereqs(course, student)) {
						availableCourses.push(course);
					}
				}
			}
		}
	}
	return availableCourses;
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
	var hours = h;
	if (hours > 12) {
		hours -= 12;
	}
	return hours;
}

function meridiem(h) {
	return (h >= 12) ? "p" : "";
}

function zeroPad(m) {
	return ("00" + m).substr(-2);
}

function printCourses(courses) {
	var coursesHTML = "";
	for (var i = 0; i < courses.length; i++) {
		var course = courses[i];
		coursesHTML += '<div class="course">';
		coursesHTML += '<h1>'+ course.department + ' ' + course.number + ': ' + course.title + '</h1>';
		var description = course.description;
		if (description != undefined) {
			coursesHTML += '<p>' + course.description + '</p>';
		}
		coursesHTML += '<div class="title">';
		{
			coursesHTML += '<div class="code">Code</div>';
			coursesHTML += '<div class="type">Type</div>';
			coursesHTML += '<div class="sec">Sec</div>';
			coursesHTML += '<div class="instructor">Instructor</div>';
			coursesHTML += '<div class="days">Days</div>';
			coursesHTML += '<div class="time">Time</div>';
			coursesHTML += '<div class="place">Place</div>';
		}
		coursesHTML += '</div>';
		for (var j = 0; j < course.classes["2017-14"].length; j++) {
			var c = course.classes["2017-14"][j];
			var timeStart = new Date(c.time.start);
			var timeEnd = new Date(c.time.end);
			coursesHTML += '<a class="class" href="#">';
			{
				coursesHTML += '<div class="code">' + c.code + '</div>';
				coursesHTML += '<div class="type">' + c.type + '</div>';
				coursesHTML += '<div class="sec">' + c.section + '</div>';
				coursesHTML += '<div class="instructor">' + c.instructor + '</div>';
				coursesHTML += '<div class="days">' + c.days.map(weekdays).join("") + '</div>';
				coursesHTML += '<div class="time">';
				{
					coursesHTML += '<span class="start">' + twelveHours(timeStart.getUTCHours()) + ':' + zeroPad(timeStart.getUTCMinutes()) + '</span>';
					coursesHTML += '<span class="meridiem">' + meridiem(timeStart.getUTCHours()) + '</span>';
					coursesHTML += '<span class="sep">-</span>';
					coursesHTML += '<span class="end">' + twelveHours(timeEnd.getUTCHours()) + ':' + zeroPad(timeEnd.getUTCMinutes()) + '</span>';
					coursesHTML += '<span class="meridiem">' + meridiem(timeEnd.getUTCHours()) + '</span>';
				}
				coursesHTML += '</div>';
				coursesHTML += '<div class="place">' + c.place + '</div>';
			}
			coursesHTML += '</a>';
		}
		coursesHTML += '</div>';
		if (i < (courses.length - 1)) {
			coursesHTML += '<div class="separator"></div>';
		}
	}
	document.getElementById("courses").innerHTML = coursesHTML;
}

var student = dataFor(studentID);
var courses = availableCoursesFor(student);
printCourses(courses);
