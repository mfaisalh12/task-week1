const express = require('express');
const blogController = require('../controllers/blogController'); //connect to blogController in controllers

const router = express.Router();

// blog routes
router.get('/', blogController.blog_index);

// post request (create)
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);

// request to get id and render to details.ejs
router.get('/:id', blogController.blog_details);

// delete
router.delete('/:id', blogController.blog_delete);


module.exports = router;