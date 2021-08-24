module.exports=(sequelize, DataTypes)=>{
    const Team = sequelize.define("team", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    })
    return Team
}