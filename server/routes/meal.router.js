const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  query = `INSERT INTO "planned_meals" ("recipe_id", "user_id") VALUES ($1, $2);`;
  pool.query(query, [req.body.recipe_id, req.body.user_id])
    .then(() => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('Error posting in meal router:', error);
      res.sendStatus(500);
    })
})

// WIP
router.get('/', (req, res)=> {
  query = `SELECT * FROM "planned_meals" WHERE "user_id"=$1;`;
  console.log('req.user:',req.user);
  
  console.log('Request in meal router:', req.body);
  // TODO: it needs to know the current users id (maybe from redux store?)
  pool.query(query, [req.user.id])
    .then((results) => {
      console.log('results.rows(from meal router get):', results.rows)
      res.send(results.rows);
    }).catch(error => {
      console.log('Error in getting planned meals by user id:', error);
      res.sendStatus(500);
    })
})

module.exports = router;