# Taxaroo code challenge

Repository of the Taxaroo code challenge.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Considerations](#considerations)
- [Approach](#Approach)

## Installation 

- You will need Docker as the database is a postgres docker container. In the /backend folder run ``docker-compose up`` to create and run the instance.
- Use [npm](https://www.npmjs.com/) to install backend and front end. Switch to both folders and run the ``npm install`` command.
- In the /backend folder, run ``npx prisma migrate dev init``

## Usage

- Now run backend with ``npm run start:dev`` and frontend with ``npm run dev``

## Considerations

Now, talking about considerations, i decided to add a simple security layer with authentication and multiple chatrooms option to add more complexity to the project.

In the front-end, also used graphql-codegen to generate types from graphql.

## Approach

Started thinking about the backend, built the prisma models first and then the base for authentication and user and got it working, then built the frontend, navbar and the auth components to integrate and check the communication and integration between both sides. Then i just did all the chatroom logic in the backend and then the frontend, leaving last the subscriptions for the messages.

## Final comments

It was a really challenging project, as i have only used React for personal projects  and never used NestJS or GraphQL either (my strong frameworks are Angular, Sails and base Node.js/Express), i learned a lot about them while coding this challenge. Adding to this, i would like to say i'm not a pro on unit testing, used Jasmine and Jest before but i had trouble configuring and setting up the testing modules so i couldn't do much on the unit testing side (of course this is not an excuse, is more of me recognizing my ponits of improvement).

I enjoyed every single piece of this project and i hope i did it right, i would love to receive any feedback you have!
