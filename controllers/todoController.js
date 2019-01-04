var bodyParser = require('body-parser');

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