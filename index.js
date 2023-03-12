function convert(data) {
    return {
        actual_max_temp: +data.actual_max_temp,
        actual_mean_temp: +data.actual_mean_temp,
        actual_min_temp: +data.actual_min_temp,
        actual_precipitation: +data.actual_precipitation,
        average_max_temp: +data.average_max_temp,
        average_min_temp: +data.average_min_temp,
        average_precipitation: +data.average_precipitation,
        date: new Date(data.date),
        record_max_temp: +data.record_max_temp,
        record_max_temp_year: new Date(data.record_max_temp_year),
        record_min_temp: +data.record_min_temp,
        record_min_temp_year: new Date(data.record_min_temp_year),
        record_precipitation: +data.record_precipitation
    };
}

const data = {
    "CLT": await d3.csv("Weather Data/CLT.csv", d => convert(d)),
    "CQT": await d3.csv("Weather Data/CQT.csv", d => convert(d)),
    "IND": await d3.csv("Weather Data/IND.csv", d => convert(d)),
    "JAX": await d3.csv("Weather Data/JAX.csv", d => convert(d)),
    "MDW": await d3.csv("Weather Data/MDW.csv", d => convert(d)),
    "PHL": await d3.csv("Weather Data/PHL.csv", d => convert(d)),
    "PHX": await d3.csv("Weather Data/PHX.csv", d => convert(d)),
    "KHOU": await d3.csv("Weather Data/KHOU.csv", d => convert(d)),
    "KNYC": await d3.csv("Weather Data/KNYC.csv", d => convert(d)),
    "KSEA": await d3.csv("Weather Data/KSEA.csv", d => convert(d)),
};

function convert_time(d) {
    return {
        actual_max_temp: d3.median(d, d => d.actual_max_temp),
        actual_mean_temp: d3.median(d, d => d.actual_mean_temp),
        actual_min_temp: d3.median(d, d => d.actual_min_temp),
        actual_precipitation: d3.sum(d, d => d.actual_precipitation),
        average_max_temp: d3.median(d, d => d.average_max_temp),
        average_min_temp: d3.median(d, d => d.average_min_temp),
        average_precipitation: d3.sum(d, d => d.average_precipitation),
        date: d[0].date,
        record_max_temp: d3.median(d, d => d.record_max_temp),
        record_max_temp_year: d3.median(d, d => d.record_max_temp_year),
        record_min_temp: d3.median(d, d => d.record_min_temp),
        record_min_temp_year: d3.min(d, d => d.record_min_temp_year),
        record_precipitation: d3.sum(d, d => d.record_precipitation)
    };
}

function group_week(region) {
    return d3.nest()
        .key(d => d3.timeWeek(d.date))
        .rollup(d => convert_time(d))
        .entries(data[region])
        .map(d => d.value);
}

function group_month(region) {
    return d3.nest()
        .key(d => d3.timeMonth(d.date))
        .rollup(d => convert_time(d))
        .entries(data[region])
        .map(d => d.value);
}


const daily = data;

const weekly = {
    "CLT": group_week("CLT"),
    "CQT": group_week("CQT"),
    "IND": group_week("IND"),
    "JAX": group_week("JAX"),
    "MDW": group_week("MDW"),
    "PHL": group_week("PHL"),
    "PHX": group_week("PHX"),
    "KHOU": group_week("KHOU"),
    "KNYC": group_week("KNYC"),
    "KSEA": group_week("KSEA"),
};

const monthly = {
    "CLT": group_month("CLT"),
    "CQT": group_month("CQT"),
    "IND": group_month("IND"),
    "JAX": group_month("JAX"),
    "MDW": group_month("MDW"),
    "PHL": group_month("PHL"),
    "PHX": group_month("PHX"),
    "KHOU": group_month("KHOU"),
    "KNYC": group_month("KNYC"),
    "KSEA": group_month("KSEA"),
};

const data_time = {
    "day": daily,
    "week": weekly,
    "month": monthly
}

const svg = d3.selectAll("svg");

const width = +svg.attr("width");
const height = +svg.attr("height");

const colorScale = {
    "CLT": "#1f77b4",
    "CQT": "#ff7f0e",
    "IND": "#2ca02c",
    "JAX": "#d62728",
    "MDW": "#9467bd",
    "PHL": "#8c564b",
    "PHX": "#e377c2",
    "KHOU": "#7f7f7f",
    "KNYC": "#bcbd22",
    "KSEA": "#17becf"
};
const margin = { top: 10, right: 25, bottom: 20, left: 35 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xScale = d3.scaleTime()
    .domain(d3.extent(data["CLT"], d => d.date))
    .range([0, innerWidth])
    .nice();

const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b %Y"));

svg.append("g")
    .call(xAxis)
    .attr("transform", `translate(${margin.left}, ${innerHeight + margin.top})`);



const avgTempSVG = d3.select("#average-temperature");
const maxTempSVG = d3.select("#record-max-temperature");
const minTempSVG = d3.select("#record-min-temperature");
const avgPerciSVG = d3.select("#average-precipitation");
const recordPerciSVG = d3.select("#record-precipitation");
const tempRangeSVG = d3.select("#temperature-range");



const yScaleTemp = d3.scaleLinear()
    .domain([0, d3.max(data["PHX"], d => d.actual_mean_temp)])
    .range([innerHeight, 0])
    .nice();

const yScalePerci = d3.scaleLinear()
    .domain([0, d3.max(data["KHOU"], d => d.actual_precipitation)])
    .range([innerHeight, 0])
    .nice();

const yScaleTempRange = d3.scaleLinear()
    .domain([d3.min(data["CLT"], d => d.record_min_temp), d3.max(data["PHX"], d => d.record_max_temp)])
    .range([innerHeight, 0])
    .nice();

const yScaleMinTemp = d3.scaleLinear()
    .domain([d3.min(data["IND"], d => d.record_min_temp), d3.max(data["PHX"], d => d.record_min_temp)])
    .range([innerHeight, 0])
    .nice();

const yScaleMaxTemp = d3.scaleLinear()
    .domain([0, d3.max(data["PHX"], d => d.record_max_temp)])
    .range([innerHeight, 0])
    .nice();

const yScaleMaxPerci = d3.scaleLinear()
    .domain([0, d3.max(data["KHOU"], d => d.record_precipitation)])
    .range([innerHeight, 0])
    .nice();

const TempAxis = avgTempSVG.append("g")
    .call(d3.axisLeft(yScaleTemp).tickFormat(d => `${d}°F`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const PerciAxis = avgPerciSVG.append("g")
    .call(d3.axisLeft(yScalePerci).tickFormat(d => `${d} in`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const TempRangeAxis = tempRangeSVG.append("g")
    .call(d3.axisLeft(yScaleTempRange).tickFormat(d => `${d}°F`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const MinTempAxis = minTempSVG.append("g")
    .call(d3.axisLeft(yScaleMinTemp).tickFormat(d => `${d}°F`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const MaxTempAxis = maxTempSVG.append("g")
    .call(d3.axisLeft(yScaleMaxTemp).tickFormat(d => `${d}°F`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const MaxPerciAxis = recordPerciSVG.append("g")
    .call(d3.axisLeft(yScaleMaxPerci).tickFormat(d => `${d} in`))
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

function lines() {
    const data = data_time[document.querySelector(".time div input:checked").value];

    yScaleTemp.domain([0, d3.max(data["PHX"], d => d.actual_mean_temp)])
        .nice();
    TempAxis.transition()
        .duration(500)
        .call(d3.axisLeft(yScaleTemp)
        .tickFormat(d => `${d}°F`));

    yScalePerci.domain([0, d3.max(data["KHOU"], d => d.actual_precipitation)])
        .nice();
    PerciAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScalePerci)
        .tickFormat(d => `${d} in`));

    yScaleTempRange.domain([d3.min(data["CLT"], d => d.record_min_temp), d3.max(data["PHX"], d => d.record_max_temp)])
        .nice();
    TempRangeAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScaleTempRange)
        .tickFormat(d => `${d}°F`));

    yScaleMinTemp.domain([d3.min(data["IND"], d => d.record_min_temp), d3.max(data["PHX"], d => d.record_min_temp)])
        .nice();
    MinTempAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScaleMinTemp)
        .tickFormat(d => `${d}°F`));

    yScaleMaxTemp.domain([0, d3.max(data["PHX"], d => d.record_max_temp)])
        .nice();
    MaxTempAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScaleMaxTemp)
        .tickFormat(d => `${d}°F`));
        
    yScaleMaxPerci.domain([0, d3.max(data["KHOU"], d => d.record_precipitation)])
        .nice();
    MaxPerciAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScaleMaxPerci)
        .tickFormat(d => `${d} in`));
    
    for (const region of document.querySelectorAll(".regions div input:checked")) {
        avgTempSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleTemp(d.actual_mean_temp))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        maxTempSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleMaxTemp(d.record_max_temp))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        minTempSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleMinTemp(d.record_min_temp))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        tempRangeSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleTempRange(d.actual_max_temp))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        tempRangeSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleTempRange(d.actual_min_temp))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        avgPerciSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScalePerci(d.actual_precipitation))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        recordPerciSVG.append("path")
            .datum(data[region.value])
            .attr("fill", "none")
            .attr("stroke", colorScale[region.value])
            .attr("stroke-width", 1.5)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d.date))
                .y(d => yScaleMaxPerci(d.record_precipitation))
            )
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    }
}
lines();

function update_plots() {
    for (const line of document.querySelectorAll("path.line")) {
        line.remove();
    }
    lines();
}

for (const region of document.querySelectorAll(".regions div input")) {
    region.addEventListener("change", () => {
        update_plots();
    });
}

for (const time of document.querySelectorAll(".time div input")) {
    time.addEventListener("change", (event) => {
        update_plots();
    });
}

export { };