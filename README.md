# Run app
## Start Server

- npm build-watch && npm start

## Start Client

- cd client && npm start


# deloy 

### Step 1 : 
- run build 

### Step 2 : 
- change "Script" 

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build-watch": "babel --watch src --out-dir dist",
    "build-server": "babel src --out-dir dist",
    "build-client": "cd client && npm i && npm run build",
    "start": "nodemon dist/server.js",
    "build": "concurrently \"npm run build-server\" \"npm run build-client\""
  },

     |
     |
     V

  "scripts": {
    "start": "nodemon dist/server.js",
  },



### Step 3 : 
- config env

##production / development
NODE_ENV = production


## Step 4

- $ heroku login


- $ heroku git:clone -a [name-app]


- $ git add .
- $ git commit -am "make it better"
- $ git push heroku master
