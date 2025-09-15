import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";

const app = express();

// Storage engine with unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store files
  },
  filename: (req, file, cb) => {
    const { year, semester, subject } = req.body;
    const timestamp = Date.now();
    const randomID = crypto.randomBytes(3).toString("hex"); // 6-char random
    const ext = path.extname(file.originalname);
    
    const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, "_"); // clean subject text
    
    const uniqueName = `Y${year}_S${semester}_${safeSubject}_${timestamp}_${randomID}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("noteFile"), (req, res) => {
  res.json({ message: "File uploaded successfully!", file: req.file.filename });
});

app.listen(3000, () => console.log("Server running on port 3000"));
