const pool = require('../modules/pool');

const addMeal = async (recipeId, userId) => {
  const query = `INSERT INTO "planned_meals" ("recipe_id", "user_id") VALUES ($1, $2);`;
  
  return pool.query(query, [recipeId, userId])
};

const getUsersMeals = async userId => {
  const query = `SELECT id as planned_id, recipe_id, planned_day FROM "planned_meals" WHERE "user_id"=$1 ORDER BY "id";`;

  const results = await pool.query(query, [userId]);

  return results.rows;
};

const updateDate = async (newDate, id) => {
  const query = `UPDATE "planned_meals" SET "planned_day"=$1 WHERE id=$2;`;

  const results = await pool.query(query, [newDate, id]);

  return results.rows;
};

const getAssignedPlannedMeals = async (userId) => {
  const query = `SELECT "id", "user_id", "recipe_id", "planned_day" FROM "planned_meals" 
  WHERE "user_id"=$1 
  AND "planned_day" IS NOT NULL
  ORDER BY "planned_day"`;

  const results = await pool.query(query, [userId]);

  return results.rows;
};

// Come from meal router to delete specific meal
const deleteMeal = async (id) => {
  const query = `DELETE FROM "planned_meals" WHERE id=$1`;

  // send back promise
  return pool.query(query, [id]);
};

// WIP
// const deleteAllMeals = async (user_id) => {
//   const query = `DELETE FROM "planned_meals" WHERE "user_id"=$1;`;

//   return pool.query(query, [user_id])
// }

module.exports = {
  addMeal,
  getUsersMeals,
  updateDate,
  getAssignedPlannedMeals,
  deleteMeal,
  
};
