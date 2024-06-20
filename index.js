import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";

import {
  TestController,
  InfoController,
  DeviceController,
  UserController,
} from "./controllers/index.js";
import { checkAuth } from "./utlis/index.js";
import Test from "./models/Test.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://nikita:wwwwww@nikitadiplom.d5qkl9x.mongodb.net/?retryWrites=true&w=majority&appName=NikitaDiplom",
  )
  .then(() => {
    console.log("Db ok.............");
  })
  .catch((err) => {
    console.log("db no.............");
    console.log(err);
  });

app.listen(4444, () => {
  console.log("server ok-----------------------");
});

// AUTH-------------------------------------------------------

app.post("/auth/login", UserController.login);

app.post("/auth/register", UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

// Device------------------------------------

app.get("/device", DeviceController.getAll);
app.get("/device/:id", DeviceController.getOne);
app.post("/device", DeviceController.create);
app.put("/device/:id", DeviceController.update);

// Test --------------------------------------------

app.post("/test/:id", TestController.create);
app.get("/test/:id", TestController.getOne);
app.put("/test/:id", TestController.update);
app.delete("/test/:id", TestController.remove);

// Info ------------------------------------------

app.post("/info/:id", InfoController.create);
app.get("/info/:id", InfoController.getOne);
app.delete("/info/:id", InfoController.remove);
app.put("/info/:id", InfoController.update);
