# Advanced Ticketing Solutions

[Live Demo](link-to-demo) | [GitHub Repository](link-to-github)

**Advanced Ticketing Solutions** is a user-friendly ticketing system built with React, TypeScript, Flask, and Postgres. It allows companies and users to register, log in, and efficiently manage tickets. Agents can troubleshoot and update tickets, while customers can submit and view their tickets seamlessly.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- User Authentication: Companies and users can sign up, log in, and manage their accounts securely.
- Role-Based Access Control: Agents have specific ticket management permissions, while customers can only submit and view tickets.
- Ticket Submission and Management: Users can create tickets, assign severity levels, and submit them for resolution.
- Agent Assignment: Tickets are assigned to teams, with each team handling a specific ticket category.
- Real-Time Updates: React components and Redux ensure smooth user interactions and real-time ticket updates.
- Database Management: Utilizes Postgres for efficient ticket tracking and association between users and their tickets.

## Installation

To run the project locally, follow these steps:

1. Clone this repository:

2. Install dependencies for the front-end:

3. Install dependencies for the back-end:

4. Create a new Postgres database and update the database credentials in the `config.py` file.

5. Run the front-end and back-end servers concurrently:

6. The project should now be running on `http://localhost:3000/`.

## Usage

- Visit the live demo to experience the ticketing system.
- Register as a user or company and log in to manage tickets.
- Agents can troubleshoot and update tickets, while customers can submit new tickets.
- Experiment with different ticket categories and severity levels.

## Technologies Used

- Frontend: React, TypeScript, Redux, HTML5, CSS3
- Backend: Flask, Postgres, Flask-SQLAlchemy

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

Feel free to customize this template with specific details about your project. The Readme file serves as an essential guide for potential users and contributors, providing them with information on the project's features, installation, usage, and technologies used.
