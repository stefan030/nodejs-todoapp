var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:yahoobre1@ds149414.mlab.com:49414/tododb', { useNewUrlParser: true});

// Create schema - this is like blueprint (What kind of information can MongoDB expect)
var todoSchema = new mongoose.Schema({
   item: String
});

// Model based on todoSchema
var Todo = mongoose.model('Todo', todoSchema);


// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'code'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to the view
        Todo.find({}, (err, data) => { // Find data from collection and save it in data which we pass to todos key
            if(err) throw err;
            res.render('todo', {todos: data});
        }); // retrieve all items from collection
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save((err, data) => {
           if(err) throw err;
           res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, "")}).remove((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

};