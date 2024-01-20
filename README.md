# Face Detector

## Table of Contents

+ [Project Description](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-description)

+ [Project Structure](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-structure) 

+ [Project Workflow](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-workflow)

+ [List of used Clarifai Machine Learning Models](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#list-of-used-clarifai-machine-learning-models)

+ [Why did I build this project ?](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#why-did-i-build-this-project-)

+ [What did I learn ?](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#what-did-i-learn-)

## Project Description

🤖 A Face Detector application with the ability to recognize faces on the provided image and compare faces for their similarity using Clarifai ML (Machine Learning) models. The application is written in JavaScript / Typescript using:
- **React** *for components*
- **Next.js** *as a react framework*
- **HTML, CSS** *for markdown and styling*
- **Express.js** *as server for interacting with 3-rd party services and DB*
- **Knex.js** *as sql query builder*
- **MySQL** *as a data storage*
- **Jest and Testing Library** *as tools for testing User Interface for consistency*
- **Clarifai API** *as a RPC ([remote procedure call](https://en.wikipedia.org/wiki/Remote_procedure_call#:~:text=RPC%20is%20a%20request%E2%80%93response,the%20application%20continues%20its%20process.)) service for image processing*
- **ImgBB** *as a service to store images*

> [!TIP]
> Images can be saved in the database using base64 string. However, I've decided to save them on the remote service to save memory. In addition, when using cloud services like AWS, they have services like S3 ([Simple Storage Service](https://aws.amazon.com/s3/)) which in this case can be used as image storage.  

## Project Structure 

```
📦 face-detector
├─ .gitignore
├─ LICENSE
├─ README.md
├─ backend
│  ├─ .dockerignore
│  ├─ Dockerfile
│  ├─ app.js
│  ├─ bin
│  │  └─ www
│  ├─ configs
│  │  ├─ clarify.config.js
│  │  └─ mysql.config.js
│  ├─ controllers
│  │  ├─ auth.controller.js
│  │  ├─ compare.controller.js
│  │  ├─ detection.controller.js
│  │  ├─ image.controller.js
│  │  └─ user.controller.js
│  ├─ lib
│  │  ├─ ai
│  │  │  ├─ face-embedder.model.js
│  │  │  ├─ face-recognition.model.js
│  │  │  ├─ general-clustering.model.js
│  │  │  ├─ general-recognition.model.js
│  │  │  └─ index.js
│  │  ├─ db
│  │  │  └─ index.js
│  │  ├─ image
│  │  │  └─ image.helper.js
│  │  └─ utils
│  │     ├─ query.util.js
│  │     └─ vector.util.js
│  ├─ middlewares
│  │  └─ user.middleware.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ stylesheets
│  │     └─ style.css
│  ├─ routes
│  │  ├─ auth.route.js
│  │  ├─ compare.route.js
│  │  ├─ detection.route.js
│  │  ├─ image.route.js
│  │  └─ users.route.js
│  └─ services
│     ├─ auth.service.js
│     ├─ compare.service.js
│     ├─ detection.service.js
│     ├─ image.service.js
│     └─ user.service.js
├─ db-init
│  └─ db-init.sql
├─ docker-compose.yml
├─ frontend
│  ├─ .dockerignore
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ app
│  │  ├─ (nav_pages)
│  │  │  ├─ _components
│  │  │  │  ├─ image-drop
│  │  │  │  │  ├─ image-drop.component.tsx
│  │  │  │  │  ├─ image-drop.module.css
│  │  │  │  │  └─ image-drop.test.tsx
│  │  │  │  └─ ui
│  │  │  │     ├─ description-list
│  │  │  │     │  └─ description-list.component.tsx
│  │  │  │     ├─ description
│  │  │  │     │  ├─ description.component.tsx
│  │  │  │     │  └─ description.module.css
│  │  │  │     ├─ detection-list
│  │  │  │     │  └─ detection-list.component.tsx
│  │  │  │     ├─ detection
│  │  │  │     │  ├─ detection.component.tsx
│  │  │  │     │  ├─ detection.module.css
│  │  │  │     │  └─ detection.test.tsx
│  │  │  │     ├─ face-box-list
│  │  │  │     │  └─ face-box-list.component.tsx
│  │  │  │     ├─ face-box
│  │  │  │     │  ├─ face-box.component.tsx
│  │  │  │     │  └─ face-box.module.css
│  │  │  │     ├─ face-canvas-list
│  │  │  │     │  ├─ face-canvas-list.component.tsx
│  │  │  │     │  └─ face-canvas-list.module.css
│  │  │  │     ├─ face-canvas
│  │  │  │     │  ├─ face-canvas.component.tsx
│  │  │  │     │  └─ face-canvas.module.css
│  │  │  │     ├─ field
│  │  │  │     │  ├─ field.component.tsx
│  │  │  │     │  ├─ field.module.css
│  │  │  │     │  └─ field.test.tsx
│  │  │  │     ├─ nav-tag-list
│  │  │  │     │  ├─ nav-tag-list.component.tsx
│  │  │  │     │  ├─ nav-tag-list.module.css
│  │  │  │     │  └─ nav-tag-list.test.tsx
│  │  │  │     ├─ nav-tag
│  │  │  │     │  ├─ nav-tag.component.tsx
│  │  │  │     │  ├─ nav-tag.module.css
│  │  │  │     │  └─ nav-tag.test.tsx
│  │  │  │     ├─ navbar
│  │  │  │     │  ├─ navbar.component.tsx
│  │  │  │     │  ├─ navbar.module.css
│  │  │  │     │  └─ navbar.test.tsx
│  │  │  │     ├─ tag-list
│  │  │  │     │  ├─ tag-list.component.tsx
│  │  │  │     │  └─ tag-list.module.css
│  │  │  │     └─ tag
│  │  │  │        ├─ tag.component.tsx
│  │  │  │        ├─ tag.module.css
│  │  │  │        └─ tag.test.tsx
│  │  │  ├─ _configs
│  │  │  │  └─ image.config.ts
│  │  │  ├─ _context
│  │  │  │  └─ tags.context.tsx
│  │  │  ├─ _utils
│  │  │  │  ├─ canvas.util.ts
│  │  │  │  ├─ converter.util.ts
│  │  │  │  ├─ fetch.util.ts
│  │  │  │  └─ image.utils.ts
│  │  │  ├─ auth
│  │  │  │  ├─ _components
│  │  │  │  │  ├─ sign-in-form
│  │  │  │  │  │  └─ sign-in-form.component.tsx
│  │  │  │  │  └─ sign-up-form
│  │  │  │  │     └─ sign-up-form.component.tsx
│  │  │  │  ├─ page.module.css
│  │  │  │  └─ page.tsx
│  │  │  ├─ compare
│  │  │  │  ├─ page.module.css
│  │  │  │  └─ page.tsx
│  │  │  ├─ detect
│  │  │  │  ├─ _components
│  │  │  │  │  └─ option-provider
│  │  │  │  │     ├─ option-provider.component.tsx
│  │  │  │  │     └─ option-provider.module.css
│  │  │  │  ├─ page.module.css
│  │  │  │  └─ page.tsx
│  │  │  ├─ images
│  │  │  │  ├─ (image)
│  │  │  │  │  ├─ [id]
│  │  │  │  │  │  ├─ loading.module.css
│  │  │  │  │  │  ├─ loading.tsx
│  │  │  │  │  │  ├─ page.module.css
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ _components
│  │  │  │  │     └─ detection-details
│  │  │  │  │        ├─ detection-details.component.tsx
│  │  │  │  │        └─ detection-details.module.css
│  │  │  │  ├─ Images.test.tsx
│  │  │  │  ├─ _components
│  │  │  │  │  ├─ backward-pagination
│  │  │  │  │  │  ├─ backward-pagination.component.tsx
│  │  │  │  │  │  └─ backward-pagination.test.tsx
│  │  │  │  │  ├─ forward-pagination
│  │  │  │  │  │  ├─ forward-pagination.component.tsx
│  │  │  │  │  │  └─ forward-pagination.test.tsx
│  │  │  │  │  ├─ pagination-bar
│  │  │  │  │  │  ├─ pagination-bar.component.tsx
│  │  │  │  │  │  ├─ pagination-bar.module.css
│  │  │  │  │  │  └─ pagination-bar.test.tsx
│  │  │  │  │  └─ side-bar
│  │  │  │  │     ├─ side-bar.component.tsx
│  │  │  │  │     ├─ side-bar.module.css
│  │  │  │  │     └─ side-bar.test.tsx
│  │  │  │  ├─ loading.module.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ page.module.css
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ profile
│  │  │     ├─ _components
│  │  │     │  ├─ comparison-table
│  │  │     │  │  ├─ comparison-table.component.tsx
│  │  │     │  │  └─ comparison-table.module.css
│  │  │     │  ├─ detection-table
│  │  │     │  │  ├─ detection-table.component.tsx
│  │  │     │  │  └─ styles.module.css
│  │  │     │  └─ statistics
│  │  │     │     ├─ statistics.component.tsx
│  │  │     │     └─ statistics.module.css
│  │  │     ├─ page.module.css
│  │  │     └─ page.tsx
│  │  ├─ Home.test.tsx
│  │  ├─ _components
│  │  │  ├─ button
│  │  │  │  ├─ button.component.tsx
│  │  │  │  ├─ button.module.css
│  │  │  │  └─ button.test.tsx
│  │  │  ├─ nav-button
│  │  │  │  ├─ nav-button.component.tsx
│  │  │  │  └─ nav-button.test.tsx
│  │  │  └─ particles
│  │  │     └─ particles.component.tsx
│  │  ├─ _context
│  │  │  └─ user.context.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.module.css
│  │  └─ page.tsx
│  ├─ jest.config.js
│  ├─ jest.setup.js
│  ├─ next.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ arrow-left.svg
│  │  ├─ arrow-right.svg
│  │  ├─ face-scan.svg
│  │  ├─ face.png
│  │  ├─ profile-icon.png
│  │  ├─ profile-image.jpeg
│  │  ├─ profile-image.png
│  │  ├─ tag-2.svg
│  │  ├─ tag-3.svg
│  │  └─ tag.svg
│  └─ tsconfig.json
├─ package-lock.json
└─ package.json
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

## Project Workflow

<!--The project is deployed using AWS. You can check it [here](). -->

## Higher level overview

![Application Workflow](https://drive.google.com/uc?id=19q8NOoxu96wT1FCxHqx9XS3QuawzA3Ey)

### Entity-Relationship Diagram
![ER-Diagram](https://drive.google.com/uc?id=1u8RghwB5tMpGkBYsi1cNNSMmFHx2pmjV)

### Detailed description

- **Main Page**: when opening the application, you can proceed both with authentication or just immediately try the app

![](https://drive.google.com/uc?export=view&id=1FsbBVUk7rbdRsA7ckZQKRmk1RdHE_yE2)

> [!IMPORTANT]
> Provided GIF is slowed by screen capturing software during conversion, however animation and transformation work faster in reality


- **Image Provider Page**: there are two ways of providing image to the service:
    + via device file system
    + via image url

![](https://drive.google.com/uc?export=view&id=1RFng_XNBDB8SMOLYUf9cNCEay2kZRarC)

- **Face Recognition Page**: after providing image on the previous step, you'll be redirected to the detection result page. On the page there are:
    + provided image with bounding box (or boxes, if there are multiple faces)
    + Side box, which retrieves only faces from the image and gives the probability of it being a human face (estimated by machine learning model)
    + Generated tags, which describe the provided image (also generated by machine learning model)
    + Meta data about the action (user, expiration, image size, creation date, url to ImgBB storage)
    + Similar detections

> [!IMPORTANT]
> Each image can be represented in n-dimensional space. The underlying machine learning model represents image in 512-dimensional space, each value of which is in the range [-1, 1]. Thus, we can compare distance between provided image and those in database and pick k-closest. Using this algorithm, similar detections are recommended to the user.

![](https://drive.google.com/uc?export=view&id=18kJ-SEuyZhIK7gLJ5icF21_huykNZgxE)

- **Comparison Page**: on this page you can provide two images of faces and check their similarity. The presented comparison is performed by representing each of the provided images as embedding of length 512 using ML model. Those embeddings are compared using cosine similarity. In addition, an impact of each of the embedding parameter is calculated.

> [!IMPORTANT]
> The underlying clarifai machine learning models are trained on restricted data sets and are free community versions, so the results sometimes could be not as precise as expected.

![](https://drive.google.com/uc?export=view&id=1hbvyHthBDQuDw6fBBPvMsDZQhlOLjS40)

- **Gallery Page**: on this page you can navigate through the all detections and filter them by tags

![](https://drive.google.com/uc?export=view&id=1GQ-fWRwaK9kTZ1K86GPNJaLzcQO-obYQ)

## List of used Clarifai Machine Learning Models

+ **Face embedder model**. Check model [here](https://clarifai.com/clarifai/main/models/face-identification-transfer-learn)
  + MODEL_ID="face-identification-transfer-learn"
  + MODEL_VERSION_ID="fc3b8814fbe54533a3d80a1896dc9884"
+ **Face recognition model**. Check model [here](https://clarifai.com/clarifai/main/models/face-detection)
  + MODEL_ID="face-detection"
  + MODEL_VERSION_ID="6dc7e46bc9124c5c8824be4822abe105"
+ **General clustering model**. Check model [here](https://clarifai.com/clarifai/main/models/general-clusterering)
  + MODEL_ID="general-clusterering"
  + MODEL_VERSION_ID="cc2074cff6dc4c02b6f4e1b8606dcb54"
+ **General recognition model**. Check model [here](https://clarifai.com/clarifai/main/models/general-image-recognition)
  + MODEL_ID="general-image-recognition"
  + MODEL_VERSION_ID="aa7f35c01e0642fda5cf400f543e7c40"
 
> [!NOTE]
> + **Face embeder model** is used to represent image in 512-dimensional space
> + **Face recognition model** is used to get a bounding box of the face on the provided image
> + **General clustering model** is used to generate two-dimensional projections as an attempt to reuse the same image without repeating detections (for example, user can detect the same image n times, however, it will be detected only once and other attempts will return processed data which is in database)
> + **General recognition model** is used to generate relevant tags which describe the provided image

## Why did I build this project ?

I built Face Detector project to understand higher level concepts of machine learning as well as to improve my skills in web development. However, it is worth noting that currently tests don't cover server side and partially client side due to the current complexity of testing server components generated with Next.js. In the next section I've listed what I've learned during the project building process.

## What did I learn ?

+ **Technologies**: React, Next.js, Express.js, Knex.js, MySQL, Jest, Testing Library
+ **Strategies and Concepts**: client / server components, server side rendering, loaders, cropping images with code, image embeddings, clustering, buffers, base64 data representation (used to transmit images through the network)
