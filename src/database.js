import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect("mongodb://localhost:27017/bibliocraDB");
    console.log("DB connect to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
