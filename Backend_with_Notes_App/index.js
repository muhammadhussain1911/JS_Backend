import express from "express";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(
    "./task_files",
    (err, files) => {
      res.render("index", { files: files });
    },
    (err) => {},
  );
});

app.post("/create", (req, res) => {
  const fileNameGivenByUser = req.body.title;
  const modifiedFileName = fileNameGivenByUser
    .split(" ")
    .map(
      (fileNameParts) =>
        fileNameParts.charAt(0).toUpperCase() + fileNameParts.slice(1),
    )
    .join("");
  fs.writeFile(
    `./task_files/${modifiedFileName}.txt`,
    req.body.description,
    (err) => {
      res.redirect("/");
    },
  );
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
