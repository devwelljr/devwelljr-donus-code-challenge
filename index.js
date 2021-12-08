require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routers/usersRouter');
const operationsRouter = require('./routers/operationsRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

/* Porta com variável de ambiente ou porta 3000 local */
const PORT = process.env.PORT || 3000;

/* Criação do app */
const app = express();
app.use(bodyParser.json());
app.use(cors());

/* Rota de cliente */
app.use('/users', usersRouter);

/* Rota de operações */
app.use('/operations', operationsRouter);

/* Middlware de erro */
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
