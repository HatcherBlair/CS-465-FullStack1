const fs = require('fs');
const roomInfo = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

const rooms = (req, res) => res.render('rooms', {title: 'Travlr Getaways', roomInfo});

module.exports = {rooms};