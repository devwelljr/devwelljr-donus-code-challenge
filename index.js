require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routers/usersRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
