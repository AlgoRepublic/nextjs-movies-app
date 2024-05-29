import fs from "fs";
import path from "path";
import mime from "mime-types";
import mongoose from "mongoose";
import { writeFile } from "fs/promises";

export const saveFile = async (file, dir = "") => {
  try {
    const assetPath = "public/assets/api/" + dir;

    if (!fs.existsSync(assetPath)) {
      fs.mkdirSync(assetPath, { recursive: true });
    }

    const filePath =
      assetPath +
      "/" +
      new mongoose.Types.ObjectId() +
      "." +
      mime.extension(file.type);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(process.cwd(), filePath), buffer);

    return filePath.slice(7);
  } catch (error) {
    return null;
  }
};
