const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all user's contacts
//@access   private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

//@route    POST api/contacts
//@desc     add new contact
//@access   private
router.post('/', (req, res) => {
  res.send('Add Contact');
});

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   private
router.put('/:id', (req, res) => {
  res.send('Update Contact');
});

//@route    DELETE api/contacts/:id
//@desc     Delete contacts
//@access   private
router.delete('/', (req, res) => {
  res.send('Delete contacts');
});
module.exports = router;
