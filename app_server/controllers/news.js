const fs = require('fs');
const latestNews = JSON.parse(fs.readFileSync('./data/latestNews.json', 'utf8'));
const vacationTips = JSON.parse(fs.readFileSync('./data/vacationTips.json', 'utf8'));

const news = (req, res) => res.render('news', {title: 'Travlr Getaways', latestNews, vacationTips});

module.exports = {news};