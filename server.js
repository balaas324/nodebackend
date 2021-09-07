const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./models")
db.sequelize.sync()

/* db.sequelize.sync({ force: true })
    .then(() => {
    console.log("Drop and re-sync db.");
  }); */

app.get("/", (req, res)=>{
    res.json({ message: "welcome te the app" })
})

require("./routes/team.routes.js")(app)

const PORT = process.env.PORT || 3030

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    //console.log(db);
})

