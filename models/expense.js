const mongoose = require('mongoose');
const { Schema }    = mongoose;

const expenseSchema = new Schema({
    id : {
        type : String
    },
    title : {
        type : String
    },
    description : {
        type : String
    },
    balance : {
        type: Number
    },
    amount : {
        type : Number
    },
    frequency : {
        type : String
    },
    date : {
        type : Date
    },
    updated : {
        type : Date
    }
})

mongoose.model('Expense', expenseSchema);
