
var express = require('express');
const itemRouter = require('./routers/item_routes');
const userRouter = require('./routers/user_routes');
const user_ItemRouter = require('./routers/user_item_routes');
const Cors = require('cors');
const path = require('path');
var app = express();

app.use(Cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/item',itemRouter);
app.use('/user',userRouter);
app.use('/user_item',user_ItemRouter);

app.listen(8080);
