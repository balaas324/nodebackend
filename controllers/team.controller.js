const db = require("../models")
const Team = db.team
const Members  = db.members
const Op = db.Sequelize.Op;

exports.createTeam = (req,res)=>{
    if(!req.body.name) {
        res.status(400).send({
            message: "content cannot be empty"
        })
        return
    }

    const team = {
        name: req.body.name
    }

    Team.create(team)
        .then(data=>{
            res.status(201).send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "something went wrong while creating the team"
            })
        })
}
