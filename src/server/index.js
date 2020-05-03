/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const request = require('request');

const API = {
  URL: 'http://www.seattle.gov/UTIL/WARP/CollectionCalendar',
  GET_ADDRESS: 'GetCCAddress',
  GET_COLLECTION_DAYS: 'GetCollectionDays',
};

const app = express();

const port = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/getAddress', (req, res) => {
  const { address } = req.query;
  const url = `${API.URL}/${API.GET_ADDRESS}?pAddress=${address}&pActiveOnly=&pRequireSolidWasteServices=true`;
  request({ url }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err.message });
    }

    res.json(JSON.parse(body));
  });
});

app.get('/getCollectionDays', (req, res) => {
  const { address } = req.query;
  const url = `${API.URL}/${API.GET_COLLECTION_DAYS}?pAccount=&pAddress=${address}&pJustChecking=&pApp=CC&pIE=&start=0`;
  request({ url }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err.message });
    }

    res.json(JSON.parse(body));
  });
});

const PORT = process.env.PORT || port;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
