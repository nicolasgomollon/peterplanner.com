//JSON Retrieval
function getJSON(url)
{
	var Httpreq = new XMLHttpRequest();
	Httpreq.open("GET", url, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function parseJSON(s)
{
	return JSON.parse(s);
}

//Class Functions
var availableClasses = [];

function addAvailableClass(title, code, prof, tooltipdata)
{
	availableClasses.push({title: title, code: code, prof: prof, tooltipdata: tooltipdata})
}

function removeAvailableClass(title)
{
	availableClasses = availableClasses.filter(function(obj) {return obj.title !== title;});
}

function getAvailableClass(title)
{
	for (i=0;i<availableClasses.length;i++)
	{
		if (title == availableClasses[i].title)
		{
			return availableClasses[i];
		}
	}
	throw 'Error';
}

var enrolledClasses = [];

function addEnrolledClass(title, code, prof, tooltipdata)
{
	enrolledClasses.push({title: title, code: code, prof: prof, tooltipdata: tooltipdata})
}

function removeEnrolledClass(title)
{
	enrolledClasses = enrolledClasses.filter(function(obj) {return obj.title !== title;});
}

function getEnrolledClass(title)
{
	for (i=0;i<enrolledClasses.length;i++)
	{
		if (title == enrolledClasses[i].title)
		{
			return enrolledClasses[i];
		}
	}
	throw 'Error';
}

//Processing JSON Data and creating classes
var masterlist = [];

function addClassesToMasterList(student) {
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
						masterlist.push({title: title, code: classes[0].code, prof: classes[0].instructor});
					}
				}
			}
		}
	}
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

var jsonText = "";
if (studentID != null) {
	jsonText = getJSON("https://peterplanner.com/launch?studentID=" + studentID + "&json=1");
}
var master = parseJSON(jsonText);
addClassesToMasterList(master);
console.log(masterlist);
