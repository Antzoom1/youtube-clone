import express from "express";
import { setupDirectories, downloadRawVideo, convertVideo, deleteRawVideo, uploadProcessedVideo } from "./storage";

// Creates the directories for videos
setupDirectories();

const app = express();
app.use(express.json());

// Processes a video from the Cloud Storage into 360p
app.post("/process-video", async (req, res) => {
    // Get the bucket and fiilename from the Cloud Pub/Sub message
    let data;
    try {
        const message = Buffer.from(req.body.message.data, `base64`).toString(`utf8`);
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error("Invalid message payload received.");
        }
        } catch (error) {
            console.error(error);
            return res.status(400).send('Bad Request: missing filename.');
        }

        const inputFileName = data.name;
        const outputFileName = `processed-${inputFileName}`;

        // Download the raw video from Cloud Storage
        await downloadRawVideo(inputFileName);


        // Upload the video to 360p
        try {
            await convertVideo(inputFileName, outputFileName);
        } catch (error) {
            await Promise.all([
                deleteRawVideo(inputFileName),
                deleteRawVideo(outputFileName)
            ]);
            console.error(error);
            return res.status(500).send(`Internal Server Error: video processing failed.`);
        }
        // Upload the processed video to Cloud Storage
        await uploadProcessedVideo(outputFileName);
        
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteRawVideo(outputFileName)
        ]);
        return res.status(200).send(`Processing finished successfully.`);
        
    });

const port = process.env.PORT || 3000 || 8080;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});