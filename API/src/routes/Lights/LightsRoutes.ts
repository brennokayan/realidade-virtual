import express from "express";
import { prisma } from "../../prisma-client/prisma-client";
import { LightsValidators } from "../../validators/Lights/lightsValidators";

const router = express.Router();

export const lightGet = router.get("/light/:id", async (req, res) => {
  try {
    const { id } = LightsValidators.lightValidatorId.parse(req.params);
    const light = await prisma.light.findFirst({
      where: { id },
    });
    res.status(200).send({ data: light });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const lightPost = router.post("/light", async (req, res) => {
  try {
    const { name, ilumminence, range, color, userId } =
      LightsValidators.lightPostValidator.parse(req.body);
    const light = await prisma.light.create({
      data: {
        name,
        color,
        ilumminence,
        range,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).send({ data: light });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const lightPut = router.put("/light/:id", async (req, res) => {
  try {
    const { id, ilumminence, range, color } =
      LightsValidators.lightPutValidator.parse(req.body);
    const light = await prisma.light.update({
      where: { id },
      data: { color, ilumminence, range },
    });
    res.status(200).send({ data: light });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const lightDelete = router.delete("/light/:id", async (req, res) => {
  try {
    const { id } = LightsValidators.lightValidatorId.parse(req.params);
    const light = await prisma.light.delete({
      where: { id },
    });
    res.status(200).send({ data: light });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
