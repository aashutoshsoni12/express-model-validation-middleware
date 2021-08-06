# express-model-validation-middleware
A middleware library for Express request validation based on model objects

## Installation - 
>npm install express-model-validation-middleware --save

## Features

Express model validation middleware is used a middlware in express js projects to validate API requests. 
 - 10+ validations
 - All basic validations used in API requests covered.
 - All custom error messages.
 - Easy to use with Javascript objects as models.
 - Custom status codes for errors.


## How to use? 
 - Create a node js an express server.
- Create an API controller.
- Create a model based on request body. And pass your defined error messages.

```js
const User = {
    name:{
        "isString":"User name must be a string",
        "min-5":"User name must be atleat 5 characters long",
        "required":"Name is required"
    },
    email:{
        "isEmail":"Enter a valid email",
        "required":"Email is required"
    },
    password:{
        "min-6":"Password must be atleat 6 characters long",
        "max-12":"Atmost 12 character long password is allowed",
        "required":"Password is required",
        "isString":"Password must be a string"
    },
    section:{
        "required":"Section name is required"
    }
}
```

-  Import ``` const {validateModel} = require('express-model-validation-middleware');```
- Pass ```validateModel``` as middleware in API controller with two arguments ``` 1.  the User model. 2. Status code you want in response.```
```js
app.route('/').post(validateModel(User, 400), (req,res)=>{
    res.json({message:"working"})
})
```
- Enter API URL on postman and send a request body. Example - 

```json
{
    "name":"Joe",
    "email":"aashutoshsoni12gmail.com",
    "password":"Test@1234"
}
```

- If there are no errors in request body as specified in Model, it'll execute the next function. Else, will through errors and status you passed in the middleware.
- For this example, there were errors in the request object. They are throuwn in the format below, with status code of 400 Bad request.
> Response
```json
{
  "name": [
    "User name must be atleat 5 characters long"
  ],
  "email": [
    "Enter a valid email"
  ],
  "section": [
    "Section name is required"
  ]
}
```


## Validations

List of all the validations are as - 

| Validator | Use case |
| ------ | ------ |
| required | Check if value is null or undefined |
| isString | Validate a string |
| min-10 | Set minimum length of characters, 10 being the length. Set it accordingly. |
| max-50 | Set maximum length of characters, 50 being the length. Set it accordingly. |
| contains-foo | Check if string has certain substring. It'll check if request string has foo present. Set it accordingly. |
| isArray | Check for request field is array |
| isObject | Check for request field is object |
| isDate | Validates date in 03-22-2021 format |
| isObject | Check for request field is object |
| equals-foo | Validates requested value equals to passed value foo. Set accordingly. |
| isInt | Check for an integer |
| isUrl | Check for URL |

## Development

Want to contribute? Great!
Feel free to mail me on aashutoshsoni12@gmail.com. Or visit my website aashutoshsoni.herokuapp.com

