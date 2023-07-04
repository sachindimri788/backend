import express from 'express';
import router from './routes/indexRoutes';
const app = express();
const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config({path:'./env/development.env'})

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});
