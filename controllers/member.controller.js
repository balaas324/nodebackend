const db = require("../models");
const { 
    findAllMembers, 
    membersBelongsToTeam, 
    createMember,
    findOneMember,
    updateMember,
    deleteMember
} = require("../services/member.sevice");
const Members  = db.members
const Op = db.Sequelize.Op;



exports.createMember = async (req,res)=>{
    const member = {
        name: req.body.name,
        // teamName: req.body.teamName,  
        teamId: req.body.teamId,
        birthYear: req.body.birthYear,
        injury: req.body.injury,
    }

    if(!member.name){
        res.status(400).send({
            message: "content cannot be empty"
        })
        return
    }
    
    try{
        const create = await createMember(member)
        return res.status(201).send(create)

    } catch{(err=>{
        res.status(500).send({
            message: err || "something went wrong while creating the member "
        })
    })}
}

exports.findAllMembers = async (req,res)=>{
    const name = req.query.name

    try {
        const allMembers = await findAllMembers(name)
        return res.status(200).send(allMembers)
    } catch {(err=>{
        res.status(500).send({
            message: err || "some error while find all members"
        })
    })}
    
}

exports.membersBelongsToTeam = async (req,res)=>{
    const teamId = req.params.teamid

    try { 
        const memberFindAll = await membersBelongsToTeam(teamId) 
        return res.status(200).send(memberFindAll)
    } catch {(err=>{
        res.status(500).send({
            message: err || "some error while find all members"
        })
    })}
}

exports.findOneMember = async (req,res)=>{
    const id = req.params.id

    try {
        const findById = await findOneMember(id)
        return res.status(200).send(findById)
    } catch {(err=>{
        res.status(500).send({
            message: "error finding the id = " + id || err
        })
    })}
}

exports.updateMember=async(req,res)=>{
    const id = req.params.id
    const body = req.body

    try {
        const update = await updateMember(id,body)
        return res.status(200).send(update)
    } catch {err=>{
        res.status(500).send({
            message: "error updating the id = " + id
        })
    }
    }
    
}
exports.deleteMember = async (req,res)=>{
    const id = req.params.id

    try {
        const destroy = await deleteMember(id)
        return res.status(200).send(destroy)
    } catch {(err=>{
        res.status(500).send({
            message: "error deleting the id = " + id || err
        })
    })}
}