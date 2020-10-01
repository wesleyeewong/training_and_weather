var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var temp_x = d3.time.scale().range([0, width]);
var max_temp_y = d3.scale.linear().range([height, 0]);
var min_temp_y = d3.scale.linear().range([height, 0]);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%Y-%m-%d"));

var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

var ryAxis = d3.svg.axis().scale(max_temp_y).orient("right").ticks(10);

var max_temp_line = d3.svg.line().x(function(d) { return temp_x(d.date); }).y(function(d) { return max_temp_y(d.max_temp); })
var min_temp_line = d3.svg.line().x(function(d) { return temp_x(d.date); }).y(function(d) { return min_temp_y(d.temp); })

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", 
		"translate(" + margin.left + "," + margin.top + ")");

var weather_data = [
	{date: parseDate("2020-09-01"), max_temp: 15.6, min_temp: 12.3, temp: 13.7, conditions: "rain"},
	{date: parseDate("2020-09-02"), max_temp: 18.3, min_temp: 11.0, temp: 14.3, conditions: "rain"},
	{date: parseDate("2020-09-03"), max_temp: 21.3, min_temp: 10.8, temp: 16.1, conditions: "clear"},
	{date: parseDate("2020-09-04"), max_temp: 25.6, min_temp: 16.1, temp: 20.2, conditions: "clear"},
	{date: parseDate("2020-09-05"), max_temp: 27.0, min_temp: 15.7, temp: 21.0, conditions: "rain"},
	{date: parseDate("2020-09-06"), max_temp: 17.6, min_temp: 14.0, temp: 15.6, conditions: "rain"},
	{date: parseDate("2020-09-07"), max_temp: 17.9, min_temp: 11.6, temp: 14.4, conditions: "rain"},
	{date: parseDate("2020-09-08"), max_temp: 21.3, min_temp: 10.8, temp: 14.9, conditions: "rain"},
	{date: parseDate("2020-09-09"), max_temp: 24.6, min_temp: 10.0, temp: 17.2, conditions: "clear"},
	{date: parseDate("2020-09-10"), max_temp: 23.6, min_temp: 12.9, temp: 18.4, conditions: "clear"},
	{date: parseDate("2020-09-11"), max_temp: 23.2, min_temp: 13.2, temp: 17.4, conditions: "clear"},
	{date: parseDate("2020-09-12"), max_temp: 25.5, min_temp: 12.2, temp: 18.4, conditions: "clear"},
	{date: parseDate("2020-09-13"), max_temp: 26.4, min_temp: 13.0, temp: 19.2, conditions: "clear"},
	{date: parseDate("2020-09-14"), max_temp: 27.0, min_temp: 13.1, temp: 19.0, conditions: "clear"},
	{date: parseDate("2020-09-15"), max_temp: 28.3, min_temp: 13.6, temp: 20.2, conditions: "clear"},
	{date: parseDate("2020-09-16"), max_temp: 26.5, min_temp: 16.3, temp: 21.0, conditions: "clear"},
	{date: parseDate("2020-09-17"), max_temp: 23.6, min_temp: 15.6, temp: 19.2, conditions: "clear"},
	{date: parseDate("2020-09-18"), max_temp: 19.8, min_temp: 11.3, temp: 15.1, conditions: "clear"},
	{date: parseDate("2020-09-19"), max_temp: 22.4, min_temp: 7.00, temp: 14.4, conditions: "clear"},
	{date: parseDate("2020-09-20"), max_temp: 22.8, min_temp: 9.70, temp: 15.8, conditions: "clear"},
	{date: parseDate("2020-09-21"), max_temp: 23.6, min_temp: 10.9, temp: 16.8, conditions: "clear"},
	{date: parseDate("2020-09-22"), max_temp: 25.3, min_temp: 12.5, temp: 17.9, conditions: "rain"},
	{date: parseDate("2020-09-23"), max_temp: 19.6, min_temp: 14.6, temp: 16.5, conditions: "rain"},
	{date: parseDate("2020-09-24"), max_temp: 21.0, min_temp: 13.1, temp: 16.9, conditions: "rain"},
	{date: parseDate("2020-09-25"), max_temp: 14.8, min_temp: 5.50, temp: 9.80, conditions: "rain"},
	{date: parseDate("2020-09-26"), max_temp: 7.50, min_temp: 6.30, temp: 6.90, conditions: "rain"},
	{date: parseDate("2020-09-27"), max_temp: 15.1, min_temp: 6.10, temp: 9.90, conditions: "clear"},
	{date: parseDate("2020-09-28"), max_temp: 10.5, min_temp: 4.80, temp: 7.70, conditions: "rain"},
	{date: parseDate("2020-09-29"), max_temp: 12.8, min_temp: 8.50, temp: 10.3, conditions: "rain"},
	{date: parseDate("2020-09-30"), max_temp: 10.9, min_temp: 10.9, temp: 10.9, conditions: "clear"},
]

d3.csv("./trainings.csv", function(error, training_count) {
	training_count.forEach(function(d) {
		console.log(d);
		d.date = parseDate(d.date);
		d.contidions = d.conditions;
		d.trainings_count = +d.trainings_count;
	});

	x.domain(training_count.map(function(d) { return d.date; }));
	y.domain([0, d3.max(training_count, function(d) { return d.trainings_count; })]);

	temp_x.domain(d3.extent(weather_data, function(d) { return d.date; }));
	max_temp_y.domain([0, d3.max(weather_data, function(d) { return d.max_temp; })]);
	min_temp_y.domain([0, d3.max(weather_data, function(d) { return d.temp; })]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.style("fill", "white")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-90)" );

	svg.append("g")
		.attr("class", "y axis")
		.style("fill", "white")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("fill", "white")
		.text("Trainings");

	svg.append("g")
		.attr("class", "right y axis")
		.attr("transform", "translate(" + width + " ,0)")
		.style("fill", "white")
		.call(ryAxis)
		.append("text")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("fill", "white")
		.text("Temperature");


	svg.selectAll("bar")
		.data(training_count)
		.enter().append("rect")
		.style("fill", function(d) {
			console.log(d.conditions)
			if (d.conditions == "rain") {
				return "grey";
			} else {
				return "steelblue";
			}
		})
		.attr("x", function(d) { return x(d.date); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.trainings_count); })
		.attr("height", function(d) { return height - y(d.trainings_count); });

	svg.append("path")
		.attr("stroke", "white")
		.attr("stroke-width", "1.5")
		.attr("class", "line")
		.attr("fill", "none")
		.attr("d", min_temp_line(weather_data));

})		
