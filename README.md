# HappyGiving

![screenshot](/screenshot.jpeg)

## About

HappyGiving is a ReactJS app that helps find charities that match your philanthropic interest. It connects to the [Global Giving API](https://www.globalgiving.org/api/). HappyGiving enables you to search charities by theme or country served.

## Installation

```
git clone https://github.com/nazifbara/happy-giving.git
cd happy-giving
npm install
```

An API key is necessary to communicate with the Global Giving API. Refer to the ["get started"](https://www.globalgiving.org/api/getting-started/) page for the relevant instructions.

After getting your API key, create a .env.local file in the project root folder. Then, populate it with the following:

```
REACT_APP_GG_API_KEY=YOUR_API_KEY
```

Now start the app:

```
npm run start
```
