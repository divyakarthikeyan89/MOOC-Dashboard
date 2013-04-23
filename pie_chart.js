/*
Expected parameters:
  // The margins of the SVG
    margin = <object>
      {top: <number>, bottom: <number>, right: <number>, left: <number>};

  // The height of the SVG
    height = <number>;

  // The width of the SVG
    width = <number>;
  
  // The data, expected as an array in desired order of the below objects
    data = <object>
    {count: <number>, percentage: <float less than 1>, label: <string>}

  // String to add to the front of all the id and class names
    tag = <string>
*/
funcCreatePieChart = function(margin, height, width, data, tag) {
  PieChart = {};
  PieChart.Margin = margin;
  PieChart.Height = height;
  PieChart.Width = width;
  PieChart.Data = data;
  PieChart.Tag = tag;

  PieChart.Radius = Math.min(PieChart.Width, PieChart.Height) / 2;

  PieChart.Scale = {
    Color : d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888"])
  };

  PieChart.Arc = d3.svg.arc()
    .outerRadius(PieChart.Radius - 10)
    .innerRadius(0);

  PieChart.Layout = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });

  PieChart.DrawGraph = function(svg) {
    PieChart = this;
    PieChart.Svg = svg;

    console.log(PieChart);

    PieChart.SvgGroup = PieChart.Svg
      .attr("id", PieChart.Tag+"-pie-chart")
      .attr("width", PieChart.Width + PieChart.Margin.left + 
            PieChart.Margin.right)
      .attr("height", PieChart.Height + PieChart.Margin.top + 
            PieChart.Margin.bottom + 50)
      .append("g")
      .attr("transform", "translate(" + PieChart.Width/2 + "," + 
            PieChart.Height/2 + ")");

    console.log(PieChart.Layout(PieChart.Data));
    PieChart.SvgGroup.selectAll(".arc")
      .data(PieChart.Layout(PieChart.Data))
      .enter().append("g")
      .attr("class", function(d){console.log(d); return "arc";});

    console.log("here");
    console.log(PieChart.Arc);
    PieChart.SvgGroup.append("path")
      .attr("d", PieChart.Arc)
      .style("fill", "blue");

    PieChart.SvgGround.append("text")
      .attr("transform", function(d) {return "translate(" +
                                      PieChart.Arc.centroid(d) + ")"; })
      .attr("dy",".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.label; });
  };
  
  return PieChart;
};