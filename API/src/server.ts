import express from "express";
import { CenterRoutes } from "./routes/centerRoute";
import { lightDelete, lightGet, lightPost, lightPut } from "./routes/Lights/LightsRoutes";
import { deleteUser, getAllUsers, getUser, postAuthLogin, postLogin, postUser, putUser } from "./routes/Users/UsersRoutes";
import { videoDelete, videoGet, videoPost, videoPostUpdate, videoPut } from "./routes/Videos/videosRoutes";
import { deleteWall, getWall, postWall, putWall } from "./routes/Walls/wallsRoutes";
import cors from "cors"
// const app = express();
// app.use(express.json());
// app.use(CenterRoutes);


// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// const PORT = process.env.PORT || 3333;
// app.listen(3333, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const app = express()
app.use(express.json());
app.use(cors())
app.get("/documentacao",async (req, rep) => {
    rep.json({message: "Hello World"})
})
app.use(getAllUsers)
app.use(deleteUser);
app.use(getUser);
app.use(postLogin);
app.use(postAuthLogin)
app.use(postUser);
app.use(putUser);
app.use(deleteWall);
app.use(getWall);
app.use(postWall);
app.use(putWall);
app.use(videoDelete)
app.use(videoGet)
app.use(videoPost)
app.use(videoPostUpdate)
app.use(videoPut)
app.use(lightDelete)
app.use(lightGet)
app.use(lightPost)
app.use(lightPut)

app.listen(3333, () => {
    console.log("Server is running on port 3333")
})