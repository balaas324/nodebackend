const { authJwt } = require("../middleware")
const controller = require("../controllers/auth.user.controller")

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/test/all", controller.allAcces)

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )

    app.get(
        "/api/list/member/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
}

