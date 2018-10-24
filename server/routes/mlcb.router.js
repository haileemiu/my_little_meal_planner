const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all the recipes back for "My Recipes View"
router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://mlcb.tyvoid.net/api/v1/recipes/'
    }).then(response => {
        //console.log('response.data.data:', response.data.data)
        // Keep the meta section, but not doing .recipes
        res.send(response.data.data);
    }).catch(error => {
        console.log('ERROR:', error);
    });
})

// Get specific recipe for user
router.get('/:id', (req, res) => {
    // console.log('REQUEST in mlcb router:', req.params);
    axios({
        method: 'GET',
        url: `https://mlcb.tyvoid.net/api/v1/recipes/${req.params.id}`
    }).then(response => {
        // console.log('response.data.data:', response.data.data)
        // Keep the meta section, but not doing .recipes
        res.send(response.data);
    }).catch(error => {
        console.log('ERROR:', error);
    });
})

module.exports = router;
