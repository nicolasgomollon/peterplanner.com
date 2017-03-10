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

var courseOptions = {};

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
					courseOptions[course.department + course.number] = true;
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
		blocks.push({title: block.title, courses: availableCourses});
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
	var title = course.title;
	if (title.length == 0) {
		title = course.stitle;
	}
	var courseHTML = '<div class="course">';
	courseHTML += '<div class="info">';
	{
		courseHTML += '<h1>' + course.department + ' ' + course.number + ': ' + title + '</h1>';
		var description = course.description;
		if (description != undefined) {
			courseHTML += '<p>' + course.description + '</p>';
		}
		var quarters = ["Fall", "Winter", "Spring"];
		var offered = [];
		for (var i = 0; i < quarters.length; i++) {
			var quarter = quarters[i];
			var q = quarter.substr(0, 1);
			var years = course.offered[q];
			if (years != undefined) {
				offered.push('<b>' + quarter + '</b> (<strong>' + years.join('</strong>, <strong>') + '</strong>)');
			}
		}
		courseHTML += '<h2><em>Offered:</em> ' + offered.join(", ") + '</h2>';
		if ((course.requiredby != null) && (course.requiredby != undefined)) {
			var required = [];
			for (var i = 0; i < course.requiredby.length; i++) {
				var cGrp = course.requiredby[i];
				if (typeof(cGrp) !== "object") { break; }
				var preReqForNumbers = [];
				for (var j = 0; j < cGrp.numbers.length; j++) {
					var key = cGrp.department + cGrp.numbers[j];
					if (courseOptions[key] === true) {
						preReqForNumbers.push(cGrp.numbers[j]);
					}
				}
				if (preReqForNumbers.length > 0) {
					required.push('<b>' + cGrp.department + '</b> <strong>' + preReqForNumbers.join('</strong>, <strong>') + '</strong>');
				}
			}
			if (required.length > 0) {
				courseHTML += '<h2><em>Required By:</em> ' + required.join(", ") + '</h2>';
			}
		}
	}
	courseHTML += '</div>';
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
			if (c.days != null) {
				courseHTML += '<div class="days">';
				courseHTML += c.days.map(weekdays).join("");
			} else {
				courseHTML += '<div class="days center">';
				courseHTML += '-';
			}
			courseHTML += '</div>';
			courseHTML += '<div class="time">';
			if (c.days != null) {
				courseHTML += '<span class="start">' + twelveHours(timeStart.getUTCHours()) + ':' + zeroPad(timeStart.getUTCMinutes()) + '</span>';
				courseHTML += '<span class="meridiem">' + meridiem(timeStart.getUTCHours()) + '</span>';
				courseHTML += '<span class="sep">-</span>';
				courseHTML += '<span class="end">' + twelveHours(timeEnd.getUTCHours()) + ':' + zeroPad(timeEnd.getUTCMinutes()) + '</span>';
				courseHTML += '<span class="meridiem">' + meridiem(timeEnd.getUTCHours()) + '</span>';
			} else {
				courseHTML += '<span class="start"></span>';
				courseHTML += '<span class="meridiem"></span>';
				courseHTML += '<span class="sep">-</span>';
				courseHTML += '<span class="end"></span>';
				courseHTML += '<span class="meridiem"></span>';
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

//
// Cookie code adapted from:
// http://www.quirksmode.org/js/cookies.html#script
//

function createCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

function save(key, value) {
	value = JSON.stringify(value);
	if (typeof(Storage) !== "undefined") {
		// Local storage is available.
		localStorage.setItem(key, value);
	} else {
		// Resort to using cookies.
		value = window.btoa(value);
		createCookie(key, value, 30 * 4);
	}
}

function get(key) {
	var value = null;
	if (typeof(Storage) !== "undefined") {
		// Local storage is available.
		value = localStorage.getItem(key);
	} else {
		// Resort to using cookies.
		value = readCookie(key);
		if (value != null) {
			value = window.atob(value);
		}
	}
	if (value != null) {
		value = JSON.parse(value);
	}
	return value;
}

var student = dataFor(uid);
var blocks = blocksFor(student);
printBlocks(blocks);
