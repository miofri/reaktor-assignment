# PROJECT BIRDNEST: NDZ Violator List

This project is my solution to Reaktor's Developer Trainee, summer 2023 pre-assignment. :blush:

## Objective: 

> Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.

> - Persist the pilot information for 10 minutes since their drone was last seen by the equipment
> - Display the closest confirmed distance to the nest
> - Contain the pilot name, email address and phone number
> - Immediately show the information from the last 10 minutes to anyone opening the application
> - Not require the user to manually refresh the view to see up-to-date information

## Tech used:
MERN stack, styled-components.

## Approach:
### Back-end
- Convert XML data to JSON with xml2js
- Populate two different collections, Pilot and Drone, with those that have violated the NDZ perimeter.
    - Formula used: Euclidean Distance Formula
- Each document in MongoDB is deleted after 10 mins.

### Front-end
- Pilot list is updated every 2s, and device's details every 10 mins alongside the closest distance (CD)
- Device details contains Guardb1rd details alongside CD. CD is calculated & updated every 10 mins from live drone data.
