# Express API http request cache
cache http request result seamlessly on the browser to avoid over loading api with hits. When you make any http request 
with axios or any other http request tool. Mostly for get requests the response data is cached in session safely and subsequent request is loaded from catch instead of api for the time specified.


# Installation  
~~~
npm install express-session-request-cache
~~~

## Usage

~~~ javascript
const queryCache = require('express-session-request-cache');

  app.get('/api/info/app/sample/endpint', function (req, res, next) {
   
     let url = 'https://something.com/api/shop/sample/data?i=sdsb&b=sdfds';
          let loadQueryCache = queryCache.Get(req,url);
   
             if(loadQueryCache === false) {
             // no cache exist make request to the api
                 axios({
                     url: url,
                     method: 'get',
                     headers: {'Authorization': process.env.AUTHKEY}
                 }).then(async (response) => {
   
                     //  console.log(response);
                     queryCache.Set(req,url,response,30);// cache result for the next 30 mins           
   
                 }).catch(function (error) {
                   
                 });
             }else{
   
              // load the result from cache
              console.log(loadQueryCache);
   
             }
   
   
   
  });
  
  ~~~

# NB
plugin uses https://www.npmjs.com/package/express-session and its advisable you use  https://www.npmjs.com/package/express-session-rsdb as your session store thus: 


~~~ javascript

const express = require('express');
const session = require('express-session');
const sessionStore = require('express-session-rsdb');
 
const app = express()
 
app.use(session({
  store: new sessionStore(),
  secret: "The secret to life is meaningless unless you discover it yourself",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1800 },
}))
 
...
~~~