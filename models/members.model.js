module.exports=(sequelize, DataTypes)=>{
    const Members = sequelize.define("members", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: { type: DataTypes.STRING },
        teamName: { type: DataTypes.STRING },
        birthYear: { type: DataTypes.INTEGER },
        injury: { type: DataTypes.BOOLEAN }
        //teamId: { type: DataTypes.INTEGER}
    })
    return Members
}