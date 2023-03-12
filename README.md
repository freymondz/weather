# weather

Final Deliverable for INFO 474

## Table of Contents
* [Design Overview](#design-overview)
* [User Tasks](#user-tasks)
* [Vis](#vis)
  * [Controls](#controls)
  * [Average Temperature](#average-temperature)
  * [Average Precipitation](#average-precipitation)
  * [Temperature Range](#temperature-range)
  * [Record Max Temperature](#record-max-temperature)
  * [Record Min Temperature](#record-min-temperature)
  * [Record Precipitation](#record-precipitation)

## Design Overview

The purpose of this vis was to allow a viewer to get a high level overview of trends and correlations of weather data for each city. Viewers can easily compare trends across cities by filtering which cities to show. Each of the graphs are plotted overtime to allow viewers to see trends in data. Viewers can also change their view of a city by switching to weekly or monthly weather views if daily plots provide too much noise. Data points are separated into individual graphs to allow for easier viewing and comparision between cities and between other graphs. Each city is color coded to allow for easy identification of which city is being shown on the graphs.

A few analytical questions that can be asked with this vis are: how does the temperature in a west coast city compare to the temperature in a east coast city? How volatile is the temperature in a city ? How is precipitation correlated with temperature? How hot or cold can a city get?

## User Tasks

* Identify trends in weather data
* Identify trends between weather data
* Compare temperature trends across cities
* Compare precipitation trends across cities
* Identify trends between cities
* Identify regional differences in weather
* Compare regional differences in weather

## Vis

The graphs are seperated to make it easier to look at each graph.

### Controls

A viewer can control which cities are currently displayed on the graphs and they can also control the granularity of the data. The viewer will know which city is selected because each checkbox button shows the color of the line that corresponds to the city. Choosing which city to display also acts as a legend because it shows the colors of the displayed cities.

![image](https://user-images.githubusercontent.com/37636251/224522992-90bbef0b-c1ac-4058-9d76-dac992fd9eec.png)

### Average Temperature

The average recorded temperature on that day.

![image](https://user-images.githubusercontent.com/37636251/224523085-ac5e07bf-b776-4cce-aa67-d6fbd79901bc.png)

### Average Precipitation

The average recorded precipitation on that day.

![image](https://user-images.githubusercontent.com/37636251/224523090-393cd6ba-9804-4934-baec-80842750b760.png)

### Temperature Range

The highest and lowest temperatures recorded on that day.

![image](https://user-images.githubusercontent.com/37636251/224523097-d01cc227-c1fd-40f3-ac14-bdbbed791140.png)

### Record Max Temperature

The highest temperature every recorded on that day.

![image](https://user-images.githubusercontent.com/37636251/224523103-3f76cd51-6ac0-4acf-819f-1ce43fc84930.png)

### Record Min Temperature

The lowest temperature ever recorded on that day.

![image](https://user-images.githubusercontent.com/37636251/224523109-1c62c0cb-ef9c-40b1-8919-be422560f1f3.png)

### Record Precipitation

The highest precipitation ever recorded on that day.

![image](https://user-images.githubusercontent.com/37636251/224523118-6b9328c7-8b78-4f35-91dc-6e926c766667.png)
