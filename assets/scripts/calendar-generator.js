function buildICSFileString(classArray, quarterStartDate, quarterEndDate) {
	result = 'BEGIN:VCALENDAR\n';
	for (var i = 0; i < classArray.length; i++) {
		result += "BEGIN:VEVENT\n";
		result += "RRULE:FREQ=WEEKLY;BYDAY=" + dayHelper(classArray[i].days) + "UNTIL=" + quarterEndDate + "\n";
		result += "DTSTART:" + quarterStartDate + timeHelper(classArray[i].starttime) + "\n";
		result += "DTSTART:" + quarterStartDate + timeHelper(classArray[i].endtime) + "\n";
		result += "SUMMARY:" + classArray[i].title + "\n";
		result += "LOCATION:" + classArray[i].building + "\n";
		result += "END:VEVENT\n";
	}
	result += "END:VCALENDAR\n";
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
	var month = String((Number(time.substring(11, 13)) + 8) % 24);
	if (month.length == 1) {
		month = "0" + month;
	}
	return "T" + month + time.substring(14, 16) + "00Z";
}

//TODO: Handle time difference, if class is after 4PM, it needs to be the next day