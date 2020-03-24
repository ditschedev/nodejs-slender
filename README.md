# NodeJS Slender
This is a barebone boilerplate for creating a nodejs api. It comes with the following features:
- 🗂 [MongoDB](https://www.mongodb.com) intergation
- 🔐 [JWT](https://jwt.io) Authentication
- 📨 Templated emails using [MJML](https://mjml.io) and [Mustache](https://mustache.github.io) 🧔🏽
- ✅ Request body validation using [Joi](https://hapi.dev/module/joi/)

---
- [NodeJS Slender](#nodejs-slender)
  - [Creating a new project](#creating-a-new-project)
  - [Predefined routes](#predefined-routes)
  - [Email templates usage](#email-templates-usage)

---

## Creating a new project
For creating a new project you can just clone this repo and change the origin.
```bash
git clone git@github.com:txbivs/nodejs-slender.git <projectname> && cd <projectname>
git remote set-url origin <your-repo>
```

After that you need to setup the environment. Start by typing the following command in your terminal of choice:
```bash
cp .env.sample .env
```
That copies the sample `.env` file. Now you need to populate that with your own data.

Next you need to install the dependencies using your package manager of choice, I use `yarn`.
```
yarn install
```

To start the app you need to type in one of the following commands depending on your current situation.
```bash
# Start app in development mode, with hot reloading enabled 
yarn dev

# Start app in production mode
yarn start
```

---

## Predefined routes
For the authentication the following routes are predefined and used:

- #### `POST /register`
    Creates a new user based on the incoming request body.

    **Request**:
    - ##### `firstName`: `string`, `required` *The first name of the new user*
    - ##### `lastName`: `string`, `required` *The last name of the new user*
    - ##### `email`: `string`, `email`, `unique`, `required` *The users email. An email can only be registered once.*
    - ##### `password`: `string`, `min(6)`, `required` *The plaintext password. Will be hashed using bcrypt.*

    **Response**: Responds with the created user. If failed returns errors.

    ##### Sample:
    ```json
    body: {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jd@example.dev",
        "password:": "!secret$"
    }
    ```

- #### `POST /login`
    Attempts a login with the given credentials.

    **Request**:
    - ##### `email`: `string`, `email`, `required` *The users email.*
    - ##### `password`: `string`, `required` *The plaintext password.*

    **Response**: If valid -> returns the generated jwt token, if failed returns a `401
    Unauthorized` with a reason.

    ##### Sample:
    ```json
    body: {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jd@example.dev",
        "password:": "!secret$"
    }
    ```

---

## Email templates usage
To use the built-in email functionality you have to add your templates first. Add your template as `<name>.mjml` to the `mail/template` folder.
You can create subfolders in the `mail/template` folder for organization, but keep in mind that you need to append that subfolder name to the path
to the template when attempting to render it!

Let's assume you created a new template under `mail/template/monitoring/ping.mjml`. For sending an email the only
code you need is the following:
```javascript
const Mail = require('path/to/mail/Mail');

// Create a new Mail instance by giving it the receipient and a subject.
let mail = new Mail('to@example.dev', 'Monitoring Alert');

// Render the variables by specifying the template and an object with the variable data.
// The sample assumes you have used the variables {{ url }} and {{ downtime }} in your mjml-template.
mail.render('monitoring/ping', {
    host: '127.0.0.1',
    downtime: '20m'
});

mail.send();
```

The `send()` function will return a `Promise`. So if you want to do something with failed emails, like logging or resending them after 1 day, or wait for the email to be sent, you can use the following code:

```javascript
mail.send().then(() => {
    // Do something on success.
}).catch((err) => {
    console.error(err);
    // Do something with the failed email.
});
```