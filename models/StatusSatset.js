import { DataTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const StatusSatset = databaseSIRS.define("status_satset", {
  status_satset: {
    type: DataTypes.INTEGER,
  },
});
