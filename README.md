# PROJECT BIRDNEST: NDZ Violator List

This project is my solution to Reaktor's Developer Trainee, summer 2023 pre-assignment. :blush:

[![Image from Gyazo](https://i.gyazo.com/5a1428a8078b0db1b808ce0db18e28c4.png)](https://gyazo.com/5a1428a8078b0db1b808ce0db18e28c4)

## Objective:

> Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.

> - Persist the pilot information for 10 minutes since their drone was last seen by the equipment
> - Display the closest confirmed distance to the nest
> - Contain the pilot name, email address and phone number
> - Immediately show the information from the last 10 minutes to anyone opening the application
> - Not require the user to manually refresh the view to see up-to-date information

## Tech used:
MERN stack, styled-components.

## Navigation:
### Back-end
- `./controllers` contains routers
- `./functions` functions called by routers
- `./models` MongoDB schema
- `./utils` helper functions
- `./reaktor-bird-app` contains front-end
- `app.js` contains the actual app
- `index.js` calls the app

### Front-end
- `./build` contains the production version of front end
- `./src/components` React components
- `./src/styles` styled-components which are used instead of normal css
- `./src/utils` helper functions
- `app.js` the React app
- `index.js` tells React where and what to render

## Approach:
### Back-end
- Convert XML data to JSON with xml2js
- Populate two different collections, Pilot and Drone, with those that have violated the NDZ perimeter.
    - Formula used: Euclidean Distance Formula
- Each document in MongoDB is deleted after 10 mins.

### Front-end
- Pilot list is updated every 2s, and device's details every 10 mins alongside the closest distance (CD)
- Device details contains Guardb1rd details alongside CD. CD is calculated & updated every 10 mins from live drone data.
