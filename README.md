# Reaktor Summer Developer 2021 pre-assignment.

## Live demo at [mtammenpaa.com](http://mtammenpaa.com/reaktor)

<img src=clothesbrand_screencap.png />

## Technologies & dependencies

#### Frontend
Built with React and TypeScript, project template built with create-react-app. Uses [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component) for smooth list scrolling and axios for GET requests to the gateway API. Testing is done using Jest and testing-library/react

#### Backend
Built with Node and Express. Axios for GET requests to the external API. Testing is done with jest and supertest.

## Quick start
Clone the repository and run 'npm clean-install' inside both the 'client' and the 'server' folder
```
git clone https://github.com/SirLarion/reaktor_pre-assignment.git
cd reaktor_pre-assignment/client && npm clean-install
cd ../server && clean-install
```
Create a .env file inside the server folder and write your port number and the url of the external API in it. For example
```
PORT=3001
BASE_URL="https://bad-api-assignment.reaktor.com/v2"
```
Then start the server by running 'node index.js' inside the server folder and the client by running 'npm start' inside the client folder
```
node index.js &
cd ../client && npm start
```

## Deploying
Build the frontend by running 'npm run build' inside the client folder. Then copy the build folder to the server folder
```
cd reaktor_pre-assignment/client && npm run build
cp -rf build ../server/
```
After this you can run the whole app by running the server. 

