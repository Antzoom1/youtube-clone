YouTube Clone Project

Introduction
This project is a simplified clone of YouTube, developed as part of a Full Stack Development course. The aim is to implement core functionalities of YouTube, focusing on simplicity and scalability, with an emphasis on the learning process rather than building a production-ready system.

Background
YouTube is a vast video sharing platform, enabling users to upload, view, rate, share, and comment on videos. Given YouTube's scale, even simple features can be complex to implement. This project primarily focuses on video uploading and viewing.

Features
Sign in/out using Google accounts
Video uploads for signed-in users
Video transcoding to multiple formats (e.g., 360p, 720p)
Viewing a list of uploaded videos
Watching individual videos
High Level Design
The architecture incorporates various cloud services:

Video Storage: Using Google Cloud Storage for hosting videos.
Video Upload Events: Utilizing Cloud Pub/Sub for managing video upload events.
Video Processing Workers: Leveraging Cloud Run and ffmpeg for video transcoding.
Video Metadata: Storing metadata in Firestore.
Video API: Developing APIs via Firebase Functions.
Web Client: Building the client interface with Next.js, hosted on Cloud Run.
Authentication: Implementing user authentication through Firebase Auth.
Detailed Design

1. User Sign Up
Integration with Firebase Auth for Google account sign-in.
Creation of user documents in Firestore for additional user information.
Server-side user document creation using Firebase Function triggers.

2. Video Upload
Restricting uploads to authenticated users.
Generating signed URLs through Firebase Functions for secure uploads to Cloud Storage.

3. Video Processing
Using Cloud Pub/Sub as a message queue for handling video uploads and processing.
Dynamic scaling of video processing workers based on workload.
Handling limitations like maximum request timeouts and message redelivery in Cloud Run and Pub/Sub.

Getting Started
Instructions for setting up the project on your local machine.

Clone the repository: git clone

CD into the yt-api-web-client directory: cd yt-api-web-client

Install dependencies: npm install 

Configure environment variables for cloud services.

Run the application: npm start
