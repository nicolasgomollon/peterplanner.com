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
	s = s.slice(5);
	s = s.slice(0, -6);
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

function addClassesToMasterList(jsondata)
{
	currentterm = jsondata.terms[0];
	for (c in jsondata.courses)
	{
		if (jsondata.courses[c].classes != null)
		{
			if (jsondata.courses[c].grade == "")
			{
				if (jsondata.courses[c].classes.hasOwnProperty(currentterm))
				{
					masterlist.push({title: c, code: jsondata.courses[c].classes[currentterm][0].code, prof: jsondata.courses[c].classes[currentterm][0].instructor});
				}
			}
		}
	}
}

//TODO: Prerequisite filtering
function validatePrerequisite(c, prereqdata)
{
	//idk what prereqdata is going to be rn it's a few lists good luck future drew
}

var jsonText = "";
if (studentID != null) {
	jsonText = getJSON("https://peterplanner.com/launch?studentID=" + studentID + "&json=1");
}
var master = parseJSON(jsonText);
addClassesToMasterList(master);
console.log(masterlist);
