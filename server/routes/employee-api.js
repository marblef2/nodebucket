/**
 * Date: 16 August 2021
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Description: This is the employee-api for getting and receiving information on the employees.
 */

const express = require ('express');
const Employee = require ('../models/employee');
const router = express.Router();
const BaseResponse = require('../models/base-response');

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

/**Update Task API */
router.put('/:empId/tasks', async(req, res) =>{

  console.log('Made it to the updateTasks API');

  try
  {
    Employee.findOne({'empId': req.params.empId}, function (err, employee){
      if (err)
      {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(updateTaskMongoErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        })

        employee.save(function (err, updatedEmployee){
          if (err)
          {
            console.log(err);
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse('501', 'Mongo Server Error', err);
            res.status(501).send(updateTaskMongoOnSaveErrorResponse.toObject());
          }
          else
          {
            console.log(updatedEmployee);
            const updatedTaskSuccessResponse = new BaseResponse('200', 'Update Successful', updatedEmployee);
            res.status(200).send(updatedTaskSuccessResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal Server Error', e);
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
})


/**Delete Task API */
router.delete('/:empId/tasks/:taskId', async(req,res) =>
{
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if(err)
      {
        console.log(err);
        const deleteTaskMongoErrorResponse =  new BaseResponse('501', 'Mongo Server Error', err);
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);
          if(todoItem)
          {
            employee.todo.id(todoItem._id).remove();
            employee.save(function (err, updatedTodoItemEmployee){
              if(err)
              {
                console.log(err);
                const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'Mongo Server Error', err);
                res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
              }
              else{
                console.log(updatedTodoItemEmployee);
                const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Item Removed from the Todo Array', updatedTodoItemEmployee);
                res.status(200).send(deleteTodoItemSuccessResponse.toObject());
              }
            })
          }
          else if (doneItem)
          {
            employee.done.id(doneItem._id).remove();
            employee.save(function(err, updateDoneItemEmployee){
              if (err)
              {
                console.log(err);
                const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'Mongo Server Error', err);
                res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
              }
              else
              {
                console.log(updateDoneItemEmployee);
                const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item removed from the done array', updateDoneItemEmployee);
                res.status(200).send(deleteDoneItemSuccessResponse.toObject());
              }
            })
          }
          else
          {
            console.log('Invalid taskId: ' + req.params.taskId);

            const deleteTaskNotFoundResponse = new BaseResponse('300', 'Unable to locate the requested resource', req.params.taskId);
            res.status(300).send(deleteTaskNotFoundResponse.toObject());
          }
      }
    })
  }
  catch (e)
  {
    console.log(e);

    const deleteTaskServerError = new BaseResponse('500', 'Internal Server Error',e);
    res.status(500).send(deleteTaskServerError.toObject());
  }
})

module.exports = router;
