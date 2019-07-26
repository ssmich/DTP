# DTP
game meetup app

Fullstack Development of an App - DTP (pseudonym)

App Decsription:
This app aims to help people play in-person games/sports/activites with other people on short notice in their 
local geography. BJS developed an app that provides a platform for users to choose to sign up for a variety of 
games 'hosted' by other registered users. Registered users can choose to sign up as a 'player' for up to three 
games at a time or as a 'host' for a game of their creation which other users can sign up to play. 

Data Structure

App homepage shows a carousel of photographs related to the app's function with a short intro/phrase overlayed that succinctly 
explains the app's intention. From the homepage, users can choose to host a game, view the available games, register,
or sign in. 

By choosing to host a game, the user will be directed to the register/signin page. Users register by providing an email, password, and city/state, and contact info. The option to upload a picture is a stretch goal. The user will be assigned a
userID.

The host page will include a form to input the game attributes. Users can choose to create a game as a 'host.' Required game attributes include: event name (e.g. Pete's Ping-Pong Pow-Wow), name of game being played (e.g. ping-pong), location, date, available player spots, and description which should include any associated costs to play or significant deviants from
conventional game rules (e.g. 'all players are required to wear tutus'). The user will be allowed to upload or choose from a collection of stock photos for their game index. The game will be assigned a gameID. The user's userID will be assigned to the value of the game's host parameter.

The game index page will list all available games (a stretch goal is to provide a filter). The game index page will include for each game the assigned photo, event name, drop-down description, and indicate of the game is full (no more avilable 
player spots). Strectch goals include indicating whether or not the game date is the day-of. 

If the user clicks on a game, the game's show page will include all of the game's attributes and a button to sign up to play. Everytime a user signs up to play a game, the count of available player spots will decrease by one until there are no more spots. If a player chooses to be a game 'player', the gameID will be assigned to the user as a playerGame attribute. 

A game that has no more available spots will be indicated as 'full' and remain on the page until the time and date of the event has passed. 

Model Schemas: https://docs.google.com/document/d/1bB1Nop4UaLNvbQjhxuFksv3kVKcjq0fF8IYx1IqGgEs/edit?usp=sharing
Picture of Initial Tasks and Division of Labor: https://files.slack.com/files-pri/T0351JZQ0-FLM0Z2WSV/dsc_0021.jpg

//Unedited Template below
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites


Give examples
Installing
A step by step series of examples that tell you how to get a development env running

Say what the step will be

Give the example
And repeat

until finished
End with an example of getting some data out of the system or using it for a little demo

Running the tests
Explain how to run the automated tests for this system

Break down into end to end tests
Explain what these tests test and why

Give an example
And coding style tests
Explain what these tests test and why

Give an example
Deployment
Add additional notes about how to deploy this on a live system

Built With
Dropwizard - The web framework used
Maven - Dependency Management
ROME - Used to generate RSS Feeds
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Billie Thompson - Initial work - PurpleBooth
See also the list of contributors who participated in this project.

License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
Hat tip to anyone whose code was used
Inspiration
etc
