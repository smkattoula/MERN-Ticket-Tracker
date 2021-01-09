# MERN-Ticket-Tracker
A full-stack application utilizing the MERN framework. This application allows users to create tickets to track their bugs, issues, or tasks to complete.

![Image](https://github.com/smkattoula/smkattoula.github.io/blob/master/assets/img/ticket-tracker.png)

## Installation 
Clone this repo to your text editor and `cd into the root folder`. In the command line, go ahead and run `npm install`. Afterwards, `cd into the frontend folder` and run `npm install` as well. This will install all of the dependacies for both server side and client side package.json. You can then `cd back into the root folder` and run `npm run dev` to start up the nodemon server (for real-time error handling) and the development server (to view the app in localhost on your browser). 

## System Requirement Specification (SRS)
### Overview
I am a full-stack web developer specializing in the MERN framework and currently seeking opportunities for full-time employment. My goal is to create high-quality web and mobile applications that help to solve real world business problems and engineer creative solutions to excell your company in the marketplace. The scope of this project is fairly small and simple, but provides a functional software that allows anyone to create tickets to track their bugs, issues, or tasks to complete. This application was originally designed for software developers to track their bugs, however, it can easily be implemented as a Customer Support ticketing system or Task Manager for professional business's. Ticket Tracker implements REST API's with axios, CRUD functionality, JSON, User Authentication using JWT and bcryptJS, MongoDB with mongoose, State Management using Context API, Styling of the UI with CSS, use of React libraries such as BrowserRouter, React-Router-Dom, Hooks, Bootstrap/Reactstrap and more. 

### Project Developer

**Shaker Kattoula - Full Stack Web Developer - shakerkattoula.com**

### Goal
* Manage and organize your employee's daily tasks to boost productivity and work flow.
* Provide a simple and convenient customer support ticketing system in which users can submit forms for any issue, allowing you to more effectively communicate to and serve your clientele.
* Operate as a bug tracker for software developers to track their bugs for a more efficient debugging experience. 


### Phases
* Phase 1: Backend - MongoDB with express API and mongoose, Models, API routes, CRUD functionality.
* Phase 2: Frontend - React, UI design with CSS and Bootstrap/Reactstrap, connecting frontend to backend via axios.
* Phase 3: User Authentication - JSON Web Token(JWT), bcryptJS, form validations, error handling, auth middleware.
* Phase 4: Review - Debugging, refactoring, improvements, and documentation.
* Phase 5: Deployment - Prepare build and deploy to Heroku.

### User Stories
* As a user, I WANT to be able to register my own account with a name, email and password so that I can have access to my own personal ticket tracker.
* As a user, I WANT to be able to log into my own account with my email and password.
* As a user, I WANT to be able to log out of my own account.
* As a user, I WANT to be able to create a ticket wherein each ticket item includes a category, priority, subject, description, date, and status so that I can keep track of my bugs, issues, or tasks to complete.
* As a user, I WANT to be able to see a list of all of my tickets.
* As a user, I WANT to be able to delete an existing ticket.
* As a user, I WANT to be able to edit an existing ticket.

## Blockers and Challenges
1. One blocker that had me stumped for a little while was trying fetch data for a single ticket and have that data pre-load asynchronously into the edit form whenever the "edit" button for a single ticket was clicked on. I knew I had to use the React lifecycle method, "componentDidMount". However, the lifecycle method was not fetching any data and after looking into some documentation, I had realized that I was fetching data for all tickets, instead of just a single ticket with it's unique id. It felt so obvious after realizing why it wasn't working. Anyway, I created a new route to GET a single ticket by passing in "req.params.id" and then made the axios GET request in the componentDidMount method for the EditTicket component and bam, it worked! The data of a single ticket preloaded into the edit form upon clicking the "edit" button. 
2. The biggest blocker I had on this project was upon completing most of the basic User Authentication. After implementing the auth middleware, I kept getting a 401 (unauthorized) error for all of my axios requests. The application would not allow me to make any requests after logging into my account. After two days of scowering stackoverflow and checking documentation, I discovered that I needed to include a "headers" parameter for all of my axios requests and pass in the header name along with the token (which is initially set upon logging in and retrieved from localstorage). This is because when a request is sent to the server, it needs to pass along a token in order for the client to be verified for the specific action. I felt ecstatic upon this discovery. It goes to show that with enough determination, we can succeed at any endeavor we set our minds on. This may not seem like a big win to some people, but it was to me! Solving this blocker only fueled my passion for coding and continuous learning! 
3. React-DatePicker sometimes shows the correct date, but other times the selected date will be off by one day. I still haven't been able to solve this one. It may be an interal issue with the web package itself, I may have to search for another one. I'll definetly be looking out for a solution to this one and implementing it later on.

## Ways to Improve and Future Updates
1. There is definetly a lot of room on this project for refactoring. Multiple handle change functions can be reduced into just one function, my components in React are a mix between Class based and Functional based components, not sure if this is a bad thing but I assume it would be best to keep things consistent. Some of the user auth files can be combined into one file as well. I also have a mix of async/await promises vs traditional promises throughout my code. Again, I figure the best course of action is to keep things consistent.
2. The Home page is pretty bland with a simple welcome text. I could definetly improve the look of this page and even add a unique brand name along with a brand image to make it look more authentic. 
3. Web application is not responsive and needs media queries.
4. I'll be returning in the near future to implement changes and improvements to this project. This was a fun one!
