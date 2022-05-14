var express = require('express');
var router = express.Router();
const Calendar = require("../misc/Calendar");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let calendarLinks = process.env.CALENDAR_LINKS.split(";");

  getAllEvents(calendarLinks)
  .then((allEvents) => {
    res.render('index', { events: allEvents });
  })
});


async function getAllEvents(links){
  let allEvents = [];
  await links.forEachAsync(async c => {
    let cal = new Calendar(c);
    let events = await cal.calendarEvents();
    allEvents.push(events);
  })

  return allEvents;
}

Array.prototype.forEachAsync = async function (fn) {
  for (let t of this) { await fn(t) }
}

module.exports = router;
