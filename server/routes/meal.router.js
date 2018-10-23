const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  query = `INSERT INTO "temporary" ("recipe_id", "user_id") VALUES ($1, $2);`;
  pool.query(query, [req.body.recipe_id, req.body.user_id])
    .then(() => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('Error posting in meal router:', error);
      res.sendStatus(500);
    })
})

module.exports = router;