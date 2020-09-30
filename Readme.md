# Project Title

Content Management System API

---
## Requirements

For development, you will need Node.js and a node global package.

### Node
- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version

    $ npm --version

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Running the project in production

    $ npm start

## Running the project in developement phase

    $ npm run dev


## For Database

we choose MongoDB.

for local set DB = mongodb://localhost:27017/blog in env file
for MongoDB cloud set DB = mongodb+srv://<username>:<password>@cluster0.63xa1.mongodb.net/<dbname>?retryWrites=true&w=majority in env file

or use MongoDB Atlas
(You can find MongoDB Atlas [here](https://www.mongodb.com/try)).

First create your account if already created then Signin.
Then build cluster and set organization name and project name and choose preferred language.
Then in Shared Clusters select `Create a Free`.
Then click in `Create Cluster` in bottom.(It take some time)
Then click in `CONNECT`.
Then click on `Connect Your Application`
Also set Ip address(Must)
    click on `Network Access`.
    then click on `Add IP Address`
Then copy url and paste in .env file
    DB = mongodb+srv://<username>:<password>@cluster0.63xa1.mongodb.net/<dbname>?retryWrites=true&w=majority
 
## Dependecies we use in this project
   * express 
     $ npm install express
   * mongoose
     $ npm install mongoose
   * express-validator
     $ npm install express-validator
   * bcrypt - For hashing password
     $ npm install bcrypt
   * body-parser
     $ npm install body-parser
   * cors - Cross Origin Resource Sharing
     $ npm install cors
   * cookie-parser
     $ npm install cookie-parser
   * jsonwebtoken
     $ npm install jsonwebtoken
   * dotenv
     $ npm install dotenv 
   * uuid
     $ npm install uuid

## How to use this project
This api gives you several endpoints for authentication, creating, reading, updating, deleting.
you can use this api in any frontend technology like React, Angular, Vue even use normal HTML/CSS/JS.
