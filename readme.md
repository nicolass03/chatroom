# Project Title

A brief description of what this project does and who it's for.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

You will need Docker as the database is a postgres docker container. 

- In the /backend folder run ``docker-compose up`` to create and run the instance.
- Use [npm](https://www.npmjs.com/) to install backend and front end. Switch to both folders and run the ``npm install`` command.

## Usage

- In the /backend folder, run ``npx prisma migrate dev init``
- Now run backend with ``npm run start:dev`` and frontend with ``npm run dev``

## Project considerations

***PERSONAL NOTE***: It was a really challenging project, as i have only used React for personal projects  and never used NestJS or GraphQL either (my strong frameworks are Angular, Sails and base Node.js/Express), i learned a lot about them while coding this challenge. Adding to this, i would like to say i'm not a pro on unit testing, used Jasmine and Jest before but i had trouble configuring and setting up the testing modules so i couldn't do much on the unit testing side (of course this is not an excuse, is more of me recognizing my ponits of improvement).

Now, talking about considerations, i decided to add a simple security layer with authentication and multiple chatrooms option to add more complexity to the project.

In the front-end, also used graphql-codegen to generate types from graphql.
