import express from "express";

import { dbInit } from "./database/connection.js";
import apiRoutes from "./routes/index.js";
import cors from "cors"
const app = express()
const port = 5000

dbInit();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})