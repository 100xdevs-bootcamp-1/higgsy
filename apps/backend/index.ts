import express from "express";
import axios from "axios";
import { prisma } from "./db";
import z from "zod"
import { CreateAvatarSchenma, CreateUserSchema } from "./types";
import { createImage } from "./image";
import { uuid } from "uuidv4";

const app = express();

app.use(express.json());

// Auth
app.post("/api/v1/signup", async (req, res) => {
  const {success, data} = CreateUserSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Incorrect credentials"
    })
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password
    }
  })
  res.json({
    id: user.id
  });
});

app.post("/api/v1/signin", (req, res) => {
  res.json({});
});

// Avatar
app.post("/api/v1/avatar", async (req, res) => {
  const { success, data } = CreateAvatarSchenma.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Incorrect"
    });
    return 
  }
  const leftProfileId = uuid();
  const rightProfileId = uuid();
  const frontProfileId = uuid();

  await Promise.all([
    createImage("Create a side profile for the user for the left side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${leftProfileId}.png`),
    createImage("Create a side profile for the user for the right side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${rightProfileId}.png`),
    createImage("Create a front profile for the user. It should be a high quality portfolio shoot type photo", data.image, `./assets/${frontProfileId}.png`),
  ])

  // put in s3 and then put in db
  
  res.json({});
});

app.get("/api/v1/avatar/:avatarId", (req, res) => {
  res.json({});
});

app.get("/api/v1/avatars", (req, res) => {
  res.json({});
});

// Video
app.post("/api/v1/video", (req, res) => {
  
  res.json({});
});

app.get("/api/v1/video/:videoId", (req, res) => {
  res.json({});
});

app.get("/api/v1/videos", (req, res) => {
  res.json({});
});

// User
app.get("/api/v1/me", (req, res) => {
  res.json({});
});

// Models
app.get("/api/v1/models", (req, res) => {
  res.json({});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
