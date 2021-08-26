const db = require("../models")
const Members  = db.members
const Op = db.Sequelize.Op;



exports.createMember = (req,res,teamId)=>{
    if(!req.body.name){
        res.status(400).send({
            message: "content cannot be empty"
        })
        return
    }

    const members = {
        name: req.body.name,
        teamName: req.body.teamName,
        birthYear: req.body.birthYear,
        injury: req.body.injury
    }

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

exports.findAllMembers = (req,res)=>{
    const name = req.query.name
    const condition = name ? { name: {[Op.like]: `%${name}%`}} : null

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