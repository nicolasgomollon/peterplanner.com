var palette = [
	{id: 0, color: '#C4A883', borderColor: '#B08B59'},
	{id: 1, color: '#A7A77D', borderColor: '#898951'},
	{id: 2, color: '#85AAA5', borderColor: '#5C8D87'},
	{id: 3, color: '#94A2BE', borderColor: '#5C8D87'},
	{id: 4, color: '#8997A5', borderColor: '#627487'},
	{id: 5, color: '#A992A9', borderColor: '#8C6D8C'},
	{id: 6, color: '#A88383', borderColor: '#A87070'},
	{id: 7, color: '#E6804D', borderColor: '#DD5511'},
	{id: 8, color: '#F2A640', borderColor: '#EE8800'},
	{id: 9, color: '#E0C240', borderColor: '#D6AE00'},
	{id: 10, color: '#BFBF4D', borderColor: '#AAAA11'},
	{id: 11, color: '#8CBF40', borderColor: '#66AA00'},
	{id: 12, color: '#4CB052', borderColor: '#109618'},
	{id: 13, color: '#65AD89', borderColor: '#329262'},
	{id: 14, color: '#59BFB3', borderColor: '#22AA99'},
	{id: 15, color: '#668CD9', borderColor: '#3366CC'},
	{id: 16, color: '#668CB3', borderColor: '#336699'},
	{id: 17, color: '#8C66D9', borderColor: '#6633CC'},
	{id: 18, color: '#B373B3', borderColor: '#994499'},
	{id: 19, color: '#E67399', borderColor: '#DD4477'},
	{id: 20, color: '#D96666', borderColor: '#CC3333'}
];

function getRandomColorPair() {
		return palette[Math.floor(Math.random() * palette.length)];

}

function colorEvent(element, colorPair) {
	$(element).css({
		'background-color': colorPair.color,
		'border': '1px solid ' + colorPair.borderColor
	});
	
	$('.wc-time', element).css({
		'background-color': colorPair.color,
		'border-left': 'none',
		'border-right': 'none',
		'border-top': 'none',
		'border-bottom': '1px solid ' + colorPair.borderColor
	});
}
