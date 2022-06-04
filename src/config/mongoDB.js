import mongoose from "mongoose";
import { db } from "./index.js";

const MONGO_ATLAS = `${db.mongo_atlas}`;

let connection;
(async () => {
  try {
    connection = await mongoose.connect(MONGO_ATLAS, db.mongoAdvancedOptions);
  } catch (error) {
    console.log(error);
  }
})();

export default mongoose;
