const db = require("../models")
const Members  = db.members
const Op = db.Sequelize.Op;


const findAllMembers = async (name) => {

    const condition = name ? { name: {[Op.like]: `%${name}%`}} : null

    try {
        const findAll = await Members.findAll({
            where: condition, 
            include: [
                { model: db.team, as: "team"}
            ]
        })
        return findAll
    } catch (err) {
        console.log(err);
    }
    
}

module.exports = {
    findAllMembers
}



