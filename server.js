const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const db = require("./models")
const Role = db.role

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* db.sequelize.sync()
    .then(()=>{
        initial()
    }) */

 db.sequelize.sync({ force: true })
    .then(() => {
      initial()
    console.log("Drop and re-sync db.");
  }); 

const initial = () => {
    Role.create({
        id: 1,
        name: "user"
      });
     
      Role.create({
        id: 2,
        name: "moderator"
      });
     
      Role.create({
        id: 3,
        name: "admin"
      });
}

app.get("/", (req, res)=>{
    res.json({ message: "welcome te the app" })
})

require("./routes/team.routes.js")(app)

require("./routes/auth.routes")(app)
require("./routes/auth.user.routes")(app)

const PORT = process.env.PORT || 3030

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    //console.log(db);
})

