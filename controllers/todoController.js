var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://<username>:<password>@ds149414.mlab.com:49414/tododb', { useNewUrlParser: true});

// Create schema - this is like blueprint (What kind of information can MongoDB expect)
var todoSchema = new mongoose.Schema({
   item: String
});

// Model based on todoSchema
var Todo = mongoose.model('Todo', todoSchema);
// Create an item of Todo model type, we pass object item: 'buy flowers' and we save it to database .save
var itemOne = Todo({item: 'buy flowers'}).save((err) => {
    if(err) throw err;
    console.log('item saved');
});


var data = [
    {
        item: 'get milk'
    },
    {
        item: 'walk dog'
    },
    {
        item: 'code'
    }
];

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body); // push received data to the array
        res.json({todos: data}); // send updated data array as json back to front end
    });

    app.delete('/todo/:item', (req, res) => {
        data = data.filter((todo) => { // Goal is to return false so we can filter out selected task from todo (data array)
           return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json({data});
    });

};