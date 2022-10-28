import express from "express";
import exphbs from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import { create } from "express-handlebars";
import path from "path";
import morgan from "morgan";

const app = express();

app.set("views", path.join(__dirname, "/views"));

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

//Routes
app.use(indexRoutes);

export default app;
