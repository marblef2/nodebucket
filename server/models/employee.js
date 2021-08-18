/**
 * Date: 16 August 2021
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Description: Creating the Employee Model for the mongoDB.
 */

const mongoose =require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creating the Employee Schema.
 */
let employeeSchema = new Schema({
  empId:{ type: String, unique: true},
  firstName:{type: String},
  lastName: {type: String}
}, {collection: 'employees'})

module.exports = mongoose.model('Employee', employeeSchema);
