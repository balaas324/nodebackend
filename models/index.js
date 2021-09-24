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

db.user = require("./auth.user.model")(sequelize, Sequelize)
db.role = require("./auth.role.model")(sequelize, Sequelize)


db.team.hasMany(db.members, { 
  foreignKey: "teamId", 
  as: "members" 
})
db.members.belongsTo(db.team, {
  foreignKey: "teamId",
  as: "team"
})  // members get teamId

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

db.ROLES = ["user", "admin", "moderator"]

module.exports = db