var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 1;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');
console.log(storage.items);

// route handler
router.get('/items', function(req, res) {
  res.json(storage.items);
});

router.get('/items/:id', function(req, res) {
  res.json(storage.items[req.params.id]);
});

router.delete('/items/:id', function(req, res) {
  storage.items.splice([req.params.id- 1], 1);
  res.json(storage.items);
});

router.post('/items/:name', function(req, res){
  var item = req.params.name;
  storage.addItem(item);
  console.log(item);
  res.send(storage.items);
});

router.get('/items');

module.exports = router;
