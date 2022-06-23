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





}