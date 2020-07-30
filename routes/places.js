'use strict';

const { Router } = require('express');
const router = new Router();

const Place = require('./../models/place');

router.get('/new', (req, res, next) => {
  res.render('places/new');
});

router.post('/new', (req, res, next) => {
  const { name, type, longitude, latitude } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      res.render('places/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Place.findOneAndDelete({ _id: id })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Place.findOne({ _id: id })
    .then(place => {
      if (place) {
        res.render('places/edit', { place });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, type, longitude, latitude } = req.body;

  Place.findOneAndUpdate(
    { _id: id },
    {
      name,
      type,
      location: {
        coordinates: [longitude, latitude]
      }
    }
  )
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
