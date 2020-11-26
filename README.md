# Frontend Applications
Frontend applications course of tech track @cmda-tt

<img src="./public/img/main.gif?raw=true">

## [Live demo](https://stan-fa.netlify.app/)

## Description

During the functional programming course @CMDA-TT, the goal is to write code that cleans data with functional patterns. One of the most important things however is to describe the used patterns and show my understanding and progress in the subject.

During the Tech Track, I will be working on a data research for De Volkskrant about parking in Dutch cities.

## Research question
**Is environmentally friendly transportation supported more in parking places that are situated in environmental zones?**

Subquestions:

* Are parkingspots closer to public transport to continue your travel this way?

_My expectation:_ environmental zones generally are in more crowded areas, so there's a good chance public transport is near.

* Do parkingspots generally have more charging points for electrical cars?

_My expectation:_ environmental zones should promote green transportation, so I expect more charging points in environmental zones on average.

* Are parkingspot in environment zones with more charging points more expensive to park?

_My expectation:_ I expect the cost of parking to be higher if there are more charging points installed, because of extra expenses. If the contrary is true, this would be very good since it would support green transportation even more.

[Data that is used](https://stan-fa.netlify.app/#footer)

## Functionalities
* View information of all environmental zones compared to the complete municipality
* Filter data by clicking on the country map
* Filter data by clicking on the municipality name

## What I do with invalid or undefined values in data
If there's an invalid of undefined value in a data point, it will stay in the array of items because it is part of the dataset. Wherever averages are created using this data, undefined or invalid items will be counted as 0 or false, and will still be counted in the average.

The only criteria my data has is that there has to be a geographical location attached, those that don't have this are not used in my visualisation or calculation at all.


## Installation
Here's how to start using this project.
### Prerequisites
* Node
* npm/yarn

### Install
1. Clone this repository
```git
git clone git@github.com:StanBankras/frontend-applications.git
```
2. Install packages
```
npm install
// or
yarn install
```
3. Run the project in a terminal
```
npm run dev
// or 
yarn dev
```

## Acknowledgements
* [TimonWeb](https://timonweb.com/javascript/how-to-enable-es6-imports-in-nodejs/) for setting up my Node development environment where I could use ES6 functionality
* [StackOverflow](https://stackoverflow.com/) for small & quick bug fixes
* [Makeshiftinsights for creating a map in Vue + D3](https://makeshiftinsights.com/blog/d3-vue-choropleth/)
* [webuildinternet for geojson data of NL](https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/)
* Laurens Aarnoudse for helping me find the API associated with geojson data about Dutch environmental zones
* [Kris Foster first view on D3 with a barchart](https://www.youtube.com/watch?v=BDpBAFvdjYo)
* [Roli Dori for publishing Vue to Github Pages](https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd)
* [Making a histogram by Observable](https://observablehq.com/@d3/histogram)
* [EazyBi.com for picking the right chart](https://eazybi.com/blog/data_visualization_and_chart_types)
* [Svelte dev for learning Svelte](https://svelte.dev/tutorial/basics)
* [Netlify for hosting](https://www.netlify.com/)
* Didier Catz & Guus Maij for helping with issues and advice

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
