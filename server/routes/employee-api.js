/**
 * Date: 16 August 2021
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Description: This is the employee-api for getting and receiving information on the employees.
 */

const express = require ('express');
const Employee = require ('../models/employee');
const router = express.Router();

router.get('/:empId', async (req, res)=>{
  //try-catch for getting the employee by empId.
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
        if(err)
        {
          //Displays an error if there is a server error.
          console.log(err);
          res.status(500). send({
            'message': 'MongoDb server Error: '+ err.message
          })
        }
        else
        {
          // if there is an employee that the get finds, this sends it back.
          console.log(employee);
          res.json(employee);
        }
    });
  }
  catch(e)
  {
    //over all Server Error.
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
});

module.exports = router;
