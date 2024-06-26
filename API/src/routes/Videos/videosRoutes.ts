import express from "express";
import { VideosValidators } from "../../validators/Videos/videosValidators";
import { prisma } from "../../prisma-client/prisma-client";
import { videoUploaderMiddleware } from "../../middlewares/uploadVideoMiddlware";
import { updateVideoMiddlware } from "../../middlewares/updateViideoMiddlware";
import multer from "multer";
import {MulterConfig}  from "../../config/multer"
const router = express.Router();

export const videoPostUpdate = router.post(
  "/video/update",
  multer(MulterConfig).single("video"),
  async (req, res) => {
    try {
      const { time, name, userId } =
        VideosValidators.VideoPostFileValidator.parse(req.body);
      const videoUrl = req.file?.path;
      const videos = await prisma.video.create({
        data: {
          time,
          name,
          user: {
            connect: { id: userId },
          },
          url: videoUrl ?? "não foi possível captar o endereço do vídeo",
        },
      });
      res.status(200).send({ data: videos });
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
);

// export const videoPostUpdate = router.post(
//   "/video/update",
//   updateVideoMiddlware.single("video"),
//   async (req, res) => {
//     try {
//       const { time, name, userId } =
//         VideosValidators.VideoPostFileValidator.parse(req.body);
//       const videoUrl = req.file?.path;
//       const videos = await prisma.video.create({
//         data: {
//           time,
//           name,
//           user: {
//             connect: { id: userId },
//           },
//           url: videoUrl ?? "não foi possível captar o endereço do vídeo",
//         },
//       });
//       res.status(200).send({ data: videos });
//     } catch (e) {
//       res.status(500).send({ error: e });
//     }
//   }
// );

export const videoGet = router.get("/video/:id", async (req, res) => {
  try {
    const { id } = VideosValidators.VideoValidatorId.parse(req.params);
    const video = await prisma.video.findUnique({
      where: { id },
      select: { id: true, name: true, url: true, time: true },
    });
    res.status(200).send({ data: video });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const videoPost = router.post("/video", async (req, res) => {
  try {
    const {name, url, time, userId} = VideosValidators.VideoPostValidator.parse(req.body);
    const video = await prisma.video.create({
      data: {
        name: name,
        url: url,
        time: time,
        user: { connect: { id: userId } },
      },
    });
    res.status(200).send({ data: video });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const videoDelete = router.delete("/video/:id", async (req, res) => {
  try {
    const { id } = VideosValidators.VideoValidatorId.parse(req.params);
    const video = await prisma.video.delete({
      where: { id },
    });
    res.status(200).send({ data: video });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

export const videoPut = router.put("/video/:id", async (req, res) => {
  try {
    const {id} = VideosValidators.VideoValidatorId.parse(req.params);
    const { name,  time } = VideosValidators.VideoPutValidator.parse(
      req.body
    );
    const video = await prisma.video.update({
      where: { id },
      data: { name, time },
    });
    res.status(200).send({ data: video });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
