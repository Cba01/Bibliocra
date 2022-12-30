import express from "express";
import exphbs from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import adminRoutes from "./routes/admin.routes";
import booksRoutes from "./routes/book.routes";
import usersRoutes from "./routes/user.routes";
import ventasRoutes from './routes/venta.routes';
import { create } from "express-handlebars";
import path from "path";
import morgan from "morgan";

const flash = require('connect-flash')
const app = express();
var bodyparser = require("body-parser");
const session = require('express-session');

app.set("views", path.join(__dirname, "/views"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

var hbs = create({
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  defaultLayout: "main",
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//MiddleWares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

app.use(session({
  secret: 'bibliocra25',
  resave: false,
  saveUninitialized: false, 
}))
app.use(flash())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});

//Routes
app.use(indexRoutes);
app.use(adminRoutes);
app.use("/api", booksRoutes);
app.use("/api", usersRoutes);
app.use('/api', ventasRoutes);

export default app;
