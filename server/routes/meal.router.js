const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  console.log('Request in meal router:', req.body);
  query = `INSERT INTO "temporary" ("recipe_id") VALUES ($1);`;
  pool.query(query, [req.body.id])
    .then(() => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('Error posting in meal router:', error);
      res.sendStatus(500);
    })
})


module.exports = router;
