# T3A2 My Kitchen Hyrules - David McArthur

Deployed page: [(www.mykitchenhyrules.com)](www.mykitchenhyrules.com)\
Github repo: [(Frontend)](https://github.com/dmac3000/mkh-frontend)\
Github repo: [(Backend)](https://github.com/dmac3000/mkh-backend)\
Trello board: [MKH - Part B](https://trello.com/invite/b/6sU3r1jG/ATTI85a704cd42ba3a30487794f140852e8519D337FF/my-kitchen-hyrules-part-b)

## Purpose

The purpose of "My Kitchen Hyrules" is to aid players of the game “Zelda: Tears of the Kingdom” with respect to the cooking aspect of the game.

The existing recipe browsing features in the game are quite limited and not easily searchable, so this web application is intended to serve as a digital companion by creating a space where players can share their culinary discoveries, search for new recipes, and interact with other community members.

## Functionality/Features

_Need to Have:_

- CRUD Operations for Recipes: Capability for users to Create, Read, Update, and Delete their own recipes.
- User Registration/Login: Secure system for users to register and login, allowing them to add, edit, and delete their own recipes and preventing them from editing other people’s recipes.
- Search Function: Users should be able to search for recipes using keywords, ingredients, or effects.
- Recipe Categories: Basic categories for recipes based on their effects or key ingredients.

_Nice to Have:_

- User Ratings and Reviews: Option for users to rate and review recipes, providing feedback to other users.
- Favourites List: Feature allowing users to bookmark favourite recipes for easy access later.
- Recipe Tags: Additional detailed tagging system for recipes to make search more precise.
- Comment/Discussion System: Option for users to leave comments on recipes and interact with each other.

## Target Audience

The target audience for this application would primarily be players of the Zelda game "Tears of the Kingdom," particularly those interested in the in-game cooking mechanic and community interaction. Additionally, this app will also serve as a demonstration of the Full Stack Web Development skills I have developed over the past year. I intend to continue building on this project well after the assessment is submitted.

## Tech Stack

I plan to use MongoDB for the database, Express.js and Node.js for the backend server, and React for the frontend web client. The application will also incorporate JSON Web Tokens (JWT) for user authentication.

## Dataflow Diagram

![Dataflow Diagram](./docs/diagrams/mkh-dataflow-diagram.png)

## Application Architecture Diagram

![Application Architecture Diagram](./docs/diagrams/mkh-application-architecture-diagram.png)

## User Stories

Noobie Nathan:
"As a new player, I want to easily find beginner-friendly recipes, so I can progress more easily in Tears of the Kingdom (TotK) by making use of stat bonuses and healing."

Expert Emma:
"As an experienced player, I want to be able to share my discovered recipes, so I can contribute to the TotK community and help less experienced players."

Casual Chris:
"As a casual player, I want to quickly find and save interesting recipes, so I can try them out during my limited game time without spending too much time on research."

Social Sarah:
"As a community-focused player, I want to rate and review the recipes I've tried, so I can share my experiences and help other players discover good recipes."

## Wireframes (Created in Figma)

![Homepage](./docs/wireframes/mkh-homepage.png)
![Recipes](./docs/wireframes/mkh-recipes.png)

## Development Testing

## Production Testing

## Libraries Used

### Frontend Libraries:

#### react-responsive-carousel: 
To enhance the user interface and improve user engagement, I integrated the react-responsive-carousel library into the frontend. This enabled the implementation of a responsive image carousel, allowing users to seamlessly navigate through content on different devices.

#### daisyUI and Tailwind: 
For frontend design and styling, I opted for the daisyUI component library in conjunction with Tailwind CSS. This choice facilitated the rapid development of a visually appealing and consistent user interface. Leveraging pre-designed components and utility classes from daisyUI, I ensured a professional and cohesive design throughout the app.

#### react-router-dom:
 For seamless navigation and efficient handling of multiple views, I integrated the react-router-dom library. This robust routing solution allowed users to transition between various pages without the need for full page reloads, enhancing the overall user experience.

#### axios: 
As a crucial element of frontend-backend communication, I employed the axios library. This enabled asynchronous HTTP requests to the backend, ensuring smooth data retrieval and manipulation while maintaining app responsiveness.

### Backend Libraries:

#### express: 
For backend development, I utilised the express framework, a robust and widely-used solution. By defining routes and middleware, I structured the backend to handle incoming requests efficiently, enabling the application to respond to user actions effectively.

#### bcrypt: 
I implemented the bcrypt library to securely hash and store user passwords. This way even if someone were to gain access to the backend, the users passwords would not be visible.

#### dotenv: 
To safeguard sensitive information such as the API key and database login details I used the dotenv library. By storing such data in a .env file, I maintained a separation between config details and the source code, reducing the risk of accidental exposure.

#### jwt: 
I integrated JSON Web Tokens (JWT) for user authentication. This enabled secure and stateless authentication, as users received encrypted tokens upon logging in, which they then presented for subsequent requests to the server.

#### mongoose: 
I used the mongoose library to interact with the MongoDB database. This required definition of data schemas and models, which helped with data consistency and validation, while simplifying database queries.

#### cors: 
In accordance with security best practices, I used the cors library to manage Cross-Origin Resource Sharing. By configuring CORS, I specified which domains could access the backend API, helping to reduce potential security risks.

## Project Management Methodology

I used the Kanban agile method to manage the flow of this project, via a Trello board with "To Do", "Doing", and "Done" lists of tasks, both big and small.

Having "To Do", "Doing" and "Done" lists allowed me to easily categorise what had been done, what I needed to focus on, and what was to come. Being able to visualise the work this way allowed me to focus on one thing at a time, without having too much going on at once, as well as being able to celebrate how much I'd achieved while watching the "Done" list grow. This helped me "focus on flow", one of the principles of Kanban.

At the end of every day, I would take a screenshot of the Trello board, which I have included below.

## Trello Screenshots

### Part A

[View Part A Trello Board](https://trello.com/invite/b/yIwG6QMV/ATTI3d0c1c4cc0f403467def0545b5a9f1f13F249448/my-kitchen-hyrules-part-a)
![Trello Screenshot #1](./docs/trello-screenshots/mkh-trello-partA-020723.png)
![Trello Screenshot #2](./docs/trello-screenshots/mkh-trello-partA-090723.png)
![Trello Screenshot #3](./docs/trello-screenshots/mkh-trello-partA-100723.png)
![Trello Screenshot #4](./docs/trello-screenshots/mkh-trello-partA-140723.png)
![Trello Screenshot #5](./docs/trello-screenshots/mkh-trello-partA-150723.png)

### Part B

[View Part B Trello Board](https://trello.com/invite/b/6sU3r1jG/ATTI85a704cd42ba3a30487794f140852e8519D337FF/my-kitchen-hyrules-part-b)
