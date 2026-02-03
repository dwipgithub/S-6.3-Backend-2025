import { DataTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const AgeGroups = databaseSIRS.define("age_groups_satusehat", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
