const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')


// INDEX
breads.get('/', (req, res) => {
  Bread.find().then(foundBread => {
    res.render('index', {breads: foundBread, title: 'Index Page'})
    
  })

  // res.send(Bread)
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})



// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy()
        res.render('show', {
            bread: foundBread
        })
      })
})

// EDIT - example: breads/2/edit
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id).then(foundBread => {
    res.render('edit', {
      bread: foundBread,
      index: req.params.id
    })
  })
})

// CREATE
breads.post('/', (req, res) => {
 const hasImage = req.body.image;
 
 if (!hasImage){
   req.body.image = undefined
   console.log('Body', req.body)
  //  req.body.image = 'https://media.istockphoto.com/photos/detailed-closeup-of-sliced-grain-bread-on-white-background-picture-id157587362?s=612x612'
 }

  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE  breads/:id
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


// UPDATE breads/:id
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})



module.exports = breads