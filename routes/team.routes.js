const authJwt = require("../middleware/authJwt.js");
const controller = require("../controllers/auth.user.controller")

module.exports = app => {
    const team = require("../controllers/team.controller.js")
    const member = require("../controllers/member.controller.js")

    const router = require("express").Router();

    router.post("/createTeam", team.createTeam)
    router.get("/teams",  team.findAllTeams, )
    router.get("/teams/:id", team.teamHasManyMembers)
    router.get("/team/:id", team.findOneTeam)
    router.put("/team/:id", team.updateTeam)
    router.delete("/team/:id", team.deleteTeam) 

    router.post("/createMember", member.createMember)
    router.get("/members", member.findAllMembers)
    router.get("/members/:teamid", member.membersBelongsToTeam)
    router.get("/member/:id",  member.findOneMember)
    router.put("/member/:id", member.updateMember)
    router.delete("/member/:id", member.deleteMember)

    app.use('/api/list', router)
}

