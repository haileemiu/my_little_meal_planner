const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool');

// Add a recipe to the user's list
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

// Get all recipe ids for the user
router.get('/', (req, res)=> {
  query = `SELECT * FROM "planned_meals" WHERE "user_id"=$1;`;

  pool.query(query, [req.user.id])
    .then((results) => {
      //console.log('results.rows(from meal router get):', results.rows)
      res.send(results.rows);
    }).catch(error => {
      console.log('Error in getting planned meals by user id:', error);
      res.sendStatus(500);
    })
})

// Update date
router.put('/:id', (req, res) => {
  query = `UPDATE "planned_meals" SET "planned_day"=$1 WHERE id=$2;`;
  pool.query(query, [req.body.newDate, req.params.id])
    .then(results => {
      // console.log('Results.rows from put router:', results.rows);
      res.send(results.rows);
    }).catch(error => {
      console.log('Error in put meal router:', error);
      res.sendStatus(500);
    })
})

// Get back the planned meals that have dates assigned
router.get('/planned', (req, res) => {
  query=`SELECT id, user_id, recipe_id, TO_CHAR("planned_day", 'MM/DD/YY') as planned_day FROM "planned_meals" 
  WHERE "user_id"=$1 
  AND "planned_day" IS NOT NULL
  ORDER BY "planned_day";`;
  pool.query(query, [req.user.id])
    .then(results => {
      console.log('Results from planned meals (with date):', results);
      res.send(results.rows)
    }).catch(error => {
      console.log('Error in get planned meals router:', error);
      res.sendStatus(500);
    })
})

module.exports = router;