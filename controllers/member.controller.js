const db = require("../models");
const { findAllMembers } = require("../services/member.sevice");
const Members  = db.members
const Op = db.Sequelize.Op;



exports.createMember = (req,res)=>{
    if(!req.body.name){
        res.status(400).send({
            message: "content cannot be empty"
        })
        return
    }

    const members = {
        name: req.body.name,
       // teamName: req.body.teamName,  //  team table where id == teamId. as name 
        birthYear: req.body.birthYear,
        injury: req.body.injury,
        teamId: req.body.teamId
    }

    //console.log(db.team);

    Members.create(members)
        .then(data=>{
            res.status(201).send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err || "something went wrong while creating the member "
            })
        })
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

exports.membersBelongsToTeam = (req,res)=>{
    const teamId = req.params.teamid

    Members.findAll({
        where: { teamId: teamId },
        include: [
            { model: db.team, as: "team"}
        ]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message: err || "some error while find all members"
        })
    })
}


exports.findAllMembersOfTeam = (req,res)=>{
    const name = req.query.teamName
    const condition = name ? { teamName: {[Op.like]: `%${name}%`}} : null

    Members.findAll({ where: condition })
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err || "some error while find all members"
            })
        })
}

exports.findOneMember = (req,res)=>{
    const id = req.params.id

    Members.findByPk(id)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: "error finding the id = " + id
            })
        })
}

exports.updateMember=(req,res)=>{
    const id = req.params.id
    Members.update(req.body, {where: { id: id }})
        .then(num=>{
            if (num==1){
                res.send({
                    message: "member updated succesfully"+id
                })
            } else {
                res.send({
                    message: `cannot update member with id=${id}`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "error updating user with id="+id
            })
        })
}

exports.deleteMember = (req,res)=>{
    const id = req.params.id

    Members.destroy({ where: { id: id } })
        .then(num=>{
            if(num==1){
                res.send({
                    message: "user was deleted succesfully"
                })
            } else {
                res.send({
                    message: `cannot delete member with id=${id}`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "could not delete use with id= "+id
            })
        })
}