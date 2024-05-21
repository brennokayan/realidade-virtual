import express from "express";
import { prisma } from "../../prisma-client/prisma-client";
import { UsersValidators } from "../../validators/Users/usersValidators";
import { string, z } from "zod";

const router = express.Router();
export const getAllUsers = router.get("/users", async (req, rep) =>{
  try {
    const users = await prisma.user.findMany({

    })
    rep.status(200).json(users)
  }
  catch(err){
    rep.status(500).json({error: err})
  }
})
export const getUser = router.get("/user/:id", async (req, res) => {
  try {
    const { id } = UsersValidators.userValidatorId.parse(req.params);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        _count: true,
        Video: {
          select: {
            name: true,
            url: true,
            time: true,
          },
        },
        Light: {
          select: {
            name: true,
            color: true,
            ilumminence: true,
            range: true,
          },
        },
        Wall: {
          select: {
            name: true,
            color: true,
          },
        },
      }
    });
    res.status(200).json( user );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export const postUser = router.post("/user", async (req, res) => {
  try {
    const data = UsersValidators.userPostValidator.parse(req.body);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "USER",
      },
    });
    res.status(200).json( user );
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export const putUser = router.put("/user/:id", async (req, res) => {
  try {
    const data = UsersValidators.userPutValidator.parse(req.body);
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export const deleteUser = router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = UsersValidators.userValidatorId.parse(req.params);
    const user = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export const postAuthLogin = router.post("/auth", async (req, rep) =>{
  try{
    const path = require('path');
    const {token} = UsersValidators.authToken.parse(req.body)
    const auth = await prisma.user.findUnique({
      where: {
        token
      },
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        _count: true,
        Video: {
          select: {
            name: true,
            url: true,
            time: true,
          },
        },
        Light: {
          select: {
            name: true,
            color: true,
            ilumminence: true,
            range: true,
          },
        },
        Wall: {
          select: {
            name: true,
            color: true,
          },
        },
      }
    })
    rep.json({data: auth, path: path.join(__dirname, 'uploads/videos')}).status(200)
  }catch(err) {
    rep.json(err).status(500)
  }
})

export const postLogin = router.post("/user/login", async (req, res) => {
  try {
    const {email, password} = UsersValidators.userLoginValidator.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        AND:{
          password
        }
      },
      select: {
        token: true
      },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
