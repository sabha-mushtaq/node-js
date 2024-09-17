// requiring express
const express = require('express');
const { handlegetallusers,addatatodatabase,updatedataindatabase,deletedataindatabase } = require('../controller/user');
// requiring router function as we are creating separate routes
const router = express.Router();
// adding data to the database
router.post("/", addatatodatabase
  );
  // getting data from database
  router.get("/",handlegetallusers
  
  
  
  )
  // updating data of database
  router.patch("/:id",updatedataindatabase
  
  
  );
  //deleting data from database
  router.delete("/:id",deletedataindatabase
  
  
  )
  module.exports= router;