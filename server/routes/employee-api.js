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
          res.status(501). send({
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


/**Find All Tasks*/

router.get('/:empId/tasks', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function (err, employee){
      if(err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDb exception: ' + err.message
        })
      }

      else
      {
        console.log(employee);
        res.json(employee);

      }
    });
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal Server Error: ' + e.message
    });
  }
})

/**createTask */
router.post('/:empId/tasks', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if(err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception: '+ err.message
        })
      }
      else
      {
        console.log(employee);

        const newTask={
          text: req.body.text
        };

        employee.todo.push(newTask);
        employee.save(function(err, updatedEmployee){
          if(err)
          {
            console.log(err);
            res.status(501).send({
              'message': 'MongoDB Exception: ' + err.message
            })
          }
          else
          {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

module.exports = router;
