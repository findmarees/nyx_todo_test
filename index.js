const cors = require('cors');
const express = require('express');
const keys = require('./config/keys');
const mongo = require('./db/mongoConnect');


mongo.mongoConnect();


const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());




require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/todoRoutes')(app);




 const PORT = (process.env.PORT || 5000);
 app.listen(PORT);