const mongoose  = require('mongoose');
const Expense   = mongoose.model('Expense');

module.exports = app => {
/*******************************************
 * Get Expenses
*******************************************/
app.get('/api/getExpenses', (req,res) =>{
    console.log("getExpense")
    Expense.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!'+err)
        }
    })
});

/*******************************************
 * New Expense
*******************************************/
app.post('/api/newExpense',(req,res) => {    
    console.log("newExpense", req.body)
    const expenseObj = new Expense({
        id          : req.body.id,
        title       : req.body.title,
        description : req.body.description,
        balance     : req.body.balance,
        amount      : req.body.amount,
        frequency   : req.body.frequency,
        date        : req.body.date,
        //date        : new Date()
    })
    expenseObj.save((err)=>{
        if(err){
            res.send('Unable to publish expense!');
        }
        else
            res.send('Expense published successfully!');
    })
  });

/*******************************************
 * Update Expense
*******************************************/
app.post('/api/updateExpense/:id',(req,res) => {    
    console.log("updateExpense", req.body)
    Expense.findOneAndUpdate({
        _id         : req.params.id
    },{
        $set: {
            id          : req.body.id,
            title       : req.body.title,
            description : req.body.description,
            balance     : req.body.balance,
            amount      : req.body.amount,
            frequency   : req.body.frequency,
            date        : req.body.date,
        }
    },(err, doc) => {
        if(doc)
            res.send('Post updated successfully!');
        else {
            res.stastus(404).send('Oops! '+err);
        }
    })
  });


/*******************************************
 * Delete Expense
*******************************************/
app.post('/api/deleteExpense/:id',(req,res) => {    
    console.log("deleteExpense", req.body)
    Expense.findOneAndRemove({
        _id         : req.params.id
    },{},(err, doc) => {
        if(doc)
            res.send('Post deleted successfully!');
        else {
            res.stastus(404).send('Oops! '+err);
        }
    })
  });





}