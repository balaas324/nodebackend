const db = require("../models")
const Members  = db.members
const Op = db.Sequelize.Op;

const getPagination = (page,size) =>{
    const limit = size ? +size : 10;
    const offset = page ? page*limit : 0;

    return { limit, offset }
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: members } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, members, totalPages, currentPage }
}


const createMember = async (member) => {
    try {
        const create = await Members.create(member)
        return create
    } catch (err){
        console.log(err);
    }
}

const findAllMembers = async (query) => {

    const { page, size, name } = query
    const condition = name ? { name: {[Op.like]: `%${name}%`}} : null

    const { limit, offset } = getPagination(page,size)

    try {
        const findAll = await Members.findAndCountAll({
            where: condition, limit, offset,
            include: [
                { model: db.team, as: "team"}
            ]
        })
        .then(data=>{
            const response = getPagingData(data,page,limit)
            return response
        })
        return findAll
    } catch (err) {
        console.log(err);
    }
    
}

const membersBelongsToTeam = async (teamId) => {

    try {
        const memberFindAll = await Members.findAll({
            where: { teamId: teamId },
            include: [
                { model: db.team, as: "team"}
            ]
        })
        return memberFindAll
    } catch (err) {
        console.log(err);
    }
}

const findOneMember = async (id) => {

    try {
        const findById = await Members.findByPk(id)
        return findById
    } catch (err) {
        console.log(err);
    }
}

const updateMember = async (id,body) => {

    try {
        const update = await Members.update(body, { where: { id: id } })
        console.log(update);
        if (update == 1) {
            return `member updated successfully. id: ${id}`
        } else {
            return `cannot update member with id=${id}`
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteMember = async (id) => {
    
    try {
        const destroy = await Members.destroy({ where: { id: id } })
        if (destroy == 1) {
            return "user was deleted successfully"
        } else {
            return `cannot update member with id=${id}`
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    findAllMembers,
    membersBelongsToTeam,
    createMember,
    findOneMember,
    updateMember,
    deleteMember
}



