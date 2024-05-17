import express from "express";
import { prisma } from "../../prisma-client/prisma-client";
import { wallsValidators } from "../../validators/Walls/wallsValidators";

const router = express.Router();

const getWall = router.get("/wall/:id", async (req, res) => {
  try {
    const { id } = wallsValidators.wallValidatorId.parse(req.params);
    const wall = await prisma.wall.findUnique({
      where: { id },
    });
    res.status(200).send({ data: wall });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

const postWall = router.post("/wall", async (req, res) => {
  try {
    const { name, color, userId } = wallsValidators.wallPostValidator.parse(
      req.body
    );
    const wall = await prisma.wall.create({
      data: {
        name,
        color,
        user: { connect: { id: userId } },
      },
    });
    res.status(200).send({ data: wall });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

const putWall = router.put("/wall/:id", async (req, res) => {
  try {
    const { id, name, color } = wallsValidators.wallPutValidator.parse(
      req.body
    );
    const wall = await prisma.wall.update({
      where: { id },
      data: { name, color },
    });
    res.status(200).send({ data: wall });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

const deleteWall = router.delete("/wall/:id", async (req, res) => {
  try {
    const { id } = wallsValidators.wallValidatorId.parse(req.params);
    const wall = await prisma.wall.delete({
      where: { id },
    });
    res.status(200).send({ data: wall });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
export { deleteWall, getWall, postWall, putWall };
