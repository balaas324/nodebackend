const config = require("../config/db.config.js")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: false,
  
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.members = require("./members.model")(sequelize, Sequelize)
db.team = require("./team.model")(sequelize, Sequelize)

db.team.hasMany(db.members, { 
  foreignKey: "teamId", 
  as: "members" 
})
db.members.belongsTo(db.team, {
  foreignKey: "teamId",
  as: "team"
})  // members get teamId

module.exports = db