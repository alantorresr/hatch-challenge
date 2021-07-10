const express = require('express');
const cors = require('cors');

const port = 80;
const api_version = 'v1';

//Server configuration
const app = express();
app.set("port", port);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//Headers and cors configuration
app.use(cors());

//Security
app.disable('x-powered-by');

//Routes
app.use(`/${api_version}`, require('./src/routes'));

//Start server
app.listen(app.get('port'), () => {
	console.info(`Server start on port ${app.get('port')}`);
});
