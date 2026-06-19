import express from "express";
import { prisma } from "./db";
import { CreateAvatarSchenma, CreateUserSchema } from "./types";
import { createImage } from "./image";
import { uuid } from "uuidv4";
import { generateVideo } from "./video";
import cors from "cors";

const app = express();

app.use(cors());

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

  // await Promise.all([
  //   createImage("Create a side profile for the user for the left side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${leftProfileId}.png`),
  //   createImage("Create a side profile for the user for the right side. It should be a high quality portfolio shoot type photo", data.image, `./assets/${rightProfileId}.png`),
  //   createImage("Create a front profile for the user. It should be a high quality portfolio shoot type photo", data.image, `./assets/${frontProfileId}.png`),
  // ])

  // put in s3 and then put in db
  await prisma.avatar.create({
    data: {
      userId: "1",
      name: req.body.name
    }
  })
  
  res.json({});
});

app.get("/api/v1/avatar/:avatarId", async (req, res) => {
  const avatars = await prisma.avatar.findMany({
    where: {
      userId: "1",
    }
  })
  console.log(avatars);
  res.json({avatars});
});

app.get("/api/v1/avatars", async (req, res) => {
  const avatars = await prisma.avatar.findMany({
    where: {
      userId: "1",
    }
  })
  res.json({avatars});
});

// Video
app.post("/api/v1/video", async (req, res) => {
  await generateVideo("The video opens with a medium, eye-level shot of a beautiful man with dark hair and warm brown eyes. She wears a magnificent, high-fashion flamingo dress with layers of pink and fuchsia feathers, complemented by whimsical pink, heart-shaped sunglasses. She walks with serene confidence through the crystal-clear, shallow turquoise water of a sun-drenched lagoon. The camera slowly pulls back to a medium-wide shot, revealing the breathtaking scene as the dress's long train glides and floats gracefully on the water's surface behind her. The cinematic, dreamlike atmosphere is enhanced by the vibrant colors of the dress against the serene, minimalist landscape, capturing a moment of pure elegance and high-fashion fantasy.", 
    ["https://raw.githubusercontent.com/100xdevs-bootcamp-1/higgsy/refs/heads/main/apps/backend/assets/09578560-870f-4b23-a1cb-b549aa38a23f.png",
      "https://raw.githubusercontent.com/100xdevs-bootcamp-1/higgsy/refs/heads/main/apps/backend/assets/a9d55f96-bc90-45e6-b078-7593b8bc3b11.png",
      "https://raw.githubusercontent.com/100xdevs-bootcamp-1/higgsy/refs/heads/main/apps/backend/assets/8106a04c-bed5-4ac4-94ef-970c5aee1518.png"
    ], "./output/video.mp4")
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
