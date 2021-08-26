const db = require("../models")
const Teams = db.team
const Op = db.Sequelize.Op;

exports.createTeam = (req,res)=>{
    if(!req.body.name) {
        res.status(400).send({
            message: "content cannot be empty"
        })
        return
    }

    const team = {
        name: req.body.name,
        nation: req.body.nation
    }

    Teams.create(team)
        .then(data=>{
            res.status(201).send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "something went wrong while creating the team"
            })
        })
}

exports.findAllTeams =(req,res)=>{
    const name = req.query.name
    const condition = name ? { name: {[Op.like]: `%${name}%`} } : null

    Teams.findAll({ where: condition })
        .then(data=>{
            res.send(data)
        })
        .catch(e=>{
            res.status(500).send({
                message: e || "some error finding a member by condition"
            })
        })
}

exports.findOneTeam =(req,res)=>{
    const id = req.params.id

    Teams.findByPk(id)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: "error finding the id = " + id
            })
        })
}

exports.updateTeam=(req,res)=>{
    const id = req.params.id
    Teams.update(req.body, {where: { id: id }})
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

exports.deleteTeam = (req,res)=>{
    const id = req.params.id

    Teams.destroy({ where: { id: id } })
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