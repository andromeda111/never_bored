var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

/* GET home page. */

router.get('/', (req, res, next) => {
  return knex.select('activities.title', 'activities.id', 'activities.cost', 'activities.energy', 'activities.time', 'activities.location', 'activities.party', 'activities.adult', 'activities.creator_id', 'activities.img_url', 'categories.name')
  .from('activities')
  .innerJoin('tags_join', 'tags_join.activity_id', 'activities.id')
  .innerJoin('categories', 'tags_join.category_id', 'categories.id')
  .orderBy('activities.id', 'asc')
  .then(allActivities => {
    //
    res.render('guide', { allActivities })
  }).catch(err => {
    next(err)
  })
})

router.get('/noresult', (req, res, next) => {
  res.render('noresult')
})

router.get('/data', (req, res, next) => {
  console.log(req.query)
  var queryData = {
    cost: req.query.cost,
    location: req.query.location,
    time: req.query.time,
    energy: req.query.energy,
    party: req.query.party
  }
  knex.select('activities.title', 'activities.id', 'activities.cost', 'activities.energy', 'activities.time', 'activities.location', 'activities.party', 'activities.adult', 'activities.creator_id', 'activities.img_url', 'categories.name')
  .from('activities')
  .innerJoin('tags_join', 'tags_join.activity_id', 'activities.id')
  .innerJoin('categories', 'tags_join.category_id', 'categories.id')
  .where(queryData)
  .then(guideActivity => {
    var arrayLength = guideActivity.length
    //
    if (guideActivity.length > 0) {
      var randomActivity = guideActivity[Math.floor(Math.random() * arrayLength)]
      res.redirect(`/activities/${randomActivity.id}`)
    } else {
      // Make error message, or page
      res.redirect('/guide/noresult')
    }
  })
})

module.exports = router
