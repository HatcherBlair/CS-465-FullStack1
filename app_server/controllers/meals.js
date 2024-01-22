const fs = require('fs');
const mealInfo = JSON.parse(fs.readFileSync('./data/mealOptions.json', 'utf8'));

const meals = (req, res) => res.render('meals', {title: 'Travlr Getaways', mealInfo});

module.exports = {meals};