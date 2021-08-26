module.exports = app => {
    const team = require("../controllers/team.controller.js")
    const member = require("../controllers/member.controller.js")

    const router = require("express").Router();

    router.post("/createTeam", team.createTeam)
    router.get("/teams", team.findAllTeams)
    router.get("/team/:id", team.findOneTeam)
    router.put("/team/:id", team.updateTeam)
    router.delete("/team/:id", team.deleteTeam)
    

    router.post("/createMember", member.createMember)
    router.get("/members", member.findAllMembers)
    router.get("/members/:id", member.findOneMember)
    router.put("/members/:id", member.updateMember)
    router.delete("/members/:id", member.deleteMember)


    app.use('/api/list', router)
}