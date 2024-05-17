import express from "express";
import { VideosValidators } from "../../validators/Videos/videosValidators";
import { prisma } from "../../prisma-client/prisma-client";
import { videoUploaderMiddleware } from "../../middlewares/uploadVideoMiddlware";
import { updateVideoMiddlware } from "../../middlewares/updateViideoMiddlware";
const router = express.Router();

// export const videoPostUpdate = router.post(
//   "/video/update",
//   videoUploaderMiddleware.single("video"),
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
//           url: videoUrl?? "não foi possível captar o endereço do vídeo",
//         },
//       });
//       res.status(200).send({ data: videos });
//     } catch (e) {
//       res.status(500).send({ error: e });
//     }
//   }
// );

export const videoPostUpdate = router.post(
  "/video/update",
  updateVideoMiddlware.single("video"),
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
    const data = VideosValidators.VideoPostValidator.parse(req.body);
    const video = await prisma.video.create({
      data: {
        name: data.name,
        url: data.url,
        time: data.time,
        user: { connect: { id: data.userId } },
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
    const { id, name, url, time } = VideosValidators.VideoPutValidator.parse(
      req.body
    );
    const video = await prisma.video.update({
      where: { id },
      data: { name, url, time },
    });
    res.status(200).send({ data: video });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});
