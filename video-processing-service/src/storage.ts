// 1. GCS file interactions
// 2. Local file interactions

import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import { raw } from "express";

const storage = new Storage();

const rawVideoBucketName = "antzoom-yt-raw-videos";
const processedVideoBucketName = "antzoom-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for raw and processed videos.
 */
export function setupDirectories() {
  ensureDirectoryExists(localRawVideoPath);
  ensureDirectoryExists(localProcessedVideoPath);
}

/**
 * @param rawVideoName - The name of the file to convert form {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to save to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video is converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
  return new Promise<void>((resolve, reject) => {
    // 360p resolution (could be changed)
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
      .outputOptions("-vf", "scale=-1:360")
      .on("end", () => {
        console.log("Processing finished successfully");
        resolve();
      })
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
        reject(err);
      })
      .save(`${localProcessedVideoPath}/${processedVideoName}`);
  });
}

/**
 * @param fileName - The name of the file to download from the 
 * {@link rawVideoBucketName} bucket. intot he {@link localRawVideoPath} directory.
 * @returns A promise that resolves when the video is downloaded.
 */
export async function downloadRawVideo(fileName: string) {
  await storage
    .bucket(rawVideoBucketName)
    .file(fileName)
    .download({ destination: `${localRawVideoPath}/${fileName}` });
  console.log(
    `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`
  );
}

/*
* @param fileNAme - The name of the file to upload fromo the 
* {@link localProcessedVideoPath} directory into the {@link processedVideoBucketName} bucket.
* @returns A promise that resolves when the video is uploaded.
*/
export async function uploadProcessedVideo(fileName: string) {
  const bucket = storage.bucket(processedVideoBucketName);
  bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
    destination: fileName,
  });
  console.log(`${fileName} uploaded to ${processedVideoBucketName}.`);
  // Sets the video to be public readable
  await bucket.file(fileName).makePublic();
}


/**
 * @param fileName - The name of the file to delete from the {@link localRawVideoPath} directory.
 * @returns A promise that resolves when the video is deleted.
 */
export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/**
 * @param fileName - The name of the file to delete from the {@link localProcessedVideoPath} directory.
 * @returns A promise that resolves when the video is deleted.
 */
export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}




/**
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file is deleted.
 */
function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(
            `Failed to delte file at ${filePath}, skipping to delete.`
          );
          reject(err);
        } else {
            console.log(`File deleted at ${filePath}`);
            resolve();
        }
      })
    } else {
        console.log(`File not found at ${filePath}, skipping the delete.`);
        resolve();
    }
  });
}

/**
 * Ensures that a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check or create.
 */
function ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
        // recursive: true enables creating nested directories
        console.log(`Directory was created at ${dirPath}`)
    }
}