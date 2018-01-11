const bodyParser = require('body-parser');
const express = require('express');
const externalRoutes = require('./route/externalRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});


// Routes
var mainRouter = express.Router();
mainRouter.get('/:name',externalRoutes.findElement);
mainRouter.get('/',externalRoutes.getAllElements);
mainRouter.post('/:name',externalRoutes.addElement);
mainRouter.put('/:name',externalRoutes.editElement);
mainRouter.delete('/:name',externalRoutes.deleteElement);
app.use('/M',mainRouter);


// handle invalid requests and internal error
app.use((req, res, next) => {
	const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});


// Set the port number
app.set('port', process.env.PORT || 3000);
// Start the server
app.listen(app.get('port'));
console.log('Server started! Running on port: ' + app.get('port'));

