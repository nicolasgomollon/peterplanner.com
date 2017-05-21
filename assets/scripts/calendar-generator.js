function buildICSFileString(classArray, quarterStartDate, quarterEndDate) {
	result = 'BEGIN:VCALENDAR\n';
	for (var i = 0; i < classArray.length; i++) {
		result += "BEGIN:VEVENT\n";
		result += "RRULE:FREQ=WEEKLY;BYDAY=" + dayHelper(classArray[i].days) + ";UNTIL=" + quarterEndDate + "T230000" + "\n";
		result += "DTSTART:" + quarterStartDate + timeHelper(classArray[i].starttime) + "\n";
		result += "DTEND:" + quarterStartDate + timeHelper(classArray[i].endtime) + "\n";
		result += "SUMMARY:" + classArray[i].title + "\n";
		result += "LOCATION:" + classArray[i].building + "\n";
		result += "END:VEVENT\n";
	}
	result += "END:VCALENDAR\n";
	return result;
}

function dayHelper(days) {
	var d = {'1': 'MO', '2': 'TU', '3': 'WE', '4': 'TH', '5': 'FR'};
	result = '';
	for (var i = 0; i < days.length; i++) {
		result += ', ' + d[days[i]];
	}
	result = result.substring(2, result.length);
	return result;
}

function timeHelper(time) {
	var month = time.substring(11, 13);
	if (month.length == 1) {
		month = "0" + month;
	}
	return "T" + month + time.substring(14, 16);
}

var sampleCA = [{'days': [2, 4], 'starttime': "0000-01-01T08:00:00", 'endtime': "0000-01-01T09:20:00", 'title': 'COMPSCI 121', 'building': 'PCB 1100'}];
var sampleSD = "20170928";
var sampleED = "20171208";