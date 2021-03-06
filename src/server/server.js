const restify = require('restify')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const methodOverride = require('method-override')

// Database schemas
const RestaurantSchema = require('./db/schemas/restaurantSchema');
const MenuSchema = require('./db/schemas/menuSchema');
const ReviewSchema = require('./db/schemas/reviewSchema');
const OrderSchema = require('./db/schemas/orderSchema');

// Starts the restify server
const server = restify.createServer();

// Helps accessing the server from any IP
server.on('MethodNotAllowed', unknownMethodHandler);
function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
        console.log('received an options method request');
      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With'];
  
      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
  
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);
  
      return res.send(204);
    }
    else
      return res.send(new restify.MethodNotAllowedError());
}

// Connects to MongoDB Server
mongoose.connect('mongodb+srv://guilherme:123@cluster0-zqwij.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

// Hosts the server on a port
server.listen(process.env.PORT || 4000, () => {
    console.log('Server running at', server.name, server.url);
})

// Helps taking the user inputs
server.use(bodyParser.urlencoded({ extended: 'false' }));
server.use(bodyParser.json());
server.use(cors());
server.use(logger('dev'));
server.use(methodOverride());

server.get('/', function (req, res) {
    res.json({ "status": "Server is running" });
})

// READ Method
server.get('/restaurants', (req, res) => {
    RestaurantSchema.find({}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/menus', (req, res) => {
    MenuSchema.find({}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/reviews', (req, res) => {
    ReviewSchema.find({}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/orders', (req, res) => {
    OrderSchema.find({}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})

// DELETE Method
server.get('/restaurants/delete/:id', (req, res) => {
    RestaurantSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Deleted");
        }
        else{
            res.json(err);
        }
    });
})
server.get('/menus/delete/:id', (req, res) => {
    MenuSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Deleted");
        }
        else{
            res.json(err);
        }
    });
})
server.get('/reviews/delete/:id', (req, res) => {
    ReviewSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Deleted");
        }
        else{
            res.json(err);
        }
    });
})
server.get('/orders/delete/:id', (req, res) => {
    OrderSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (data) {
            res.json("Deleted");
        }
        else{
            res.json(err);
        }
    });
})

// CREATE Method
server.post('/restaurants/create', (req, res) => {
    RestaurantSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Created");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/menus/create', (req, res) => {
    MenuSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Created");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/reviews/create', (req, res) => {
    ReviewSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Created");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/orders/create', (req, res) => {
    OrderSchema.create(req.body.userInput, (err, data) => {
        if (data) {
            res.json("Created");
        }
        else{
            res.json(err);
        }
    });
})

// UPDATE Method
server.post('/restaurants/update', (req,res) => {
    RestaurantSchema.findByIdAndUpdate(req.body.id, req.body.userInput, (err, data) => {
        if(data) {
            res.json("Updated");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/menus/update', (req,res) => {
    MenuSchema.findByIdAndUpdate(req.body.id, req.body.userInput, (err, data) => {
        if(data) {
            res.json("Updated");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/reviews/update', (req,res) => {
    ReviewSchema.findByIdAndUpdate(req.body.id, req.body.userInput, (err, data) => {
        if(data) {
            res.json("Updated");
        }
        else{
            res.json(err);
        }
    });
})
server.post('/orders/update', (req,res) => {
    OrderSchema.findByIdAndUpdate(req.body.id, req.body.userInput, (err, data) => {
        if(data) {
            res.json("Updated");
        }
        else{
            res.json(err);
        }
    });
})

// GET Info by ID
server.get('/restaurants/:id', (req,res) => {
    RestaurantSchema.findOne({"_id": req.params.id}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/menus/:id', (req,res) => {
    MenuSchema.findOne({"_id": req.params.id}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/reviews/:id', (req,res) => {
    ReviewSchema.findOne({"_id": req.params.id}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})
server.get('/orders/:id', (req,res) => {
    OrderSchema.findOne({"_id": req.params.id}, (err, data) => {
        if (data) {
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})