# Face Detector

## Table of Contents

+ [Project Description](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-description)

+ [Project Structure](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-structure) 

+ [Project Workflow](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-workflow)

+ [Project Optimizations](https://github.com/SKorchinskiy/Face-Detector?tab=readme-ov-file#project-optimizations)

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

## Project Structure 

```
📦 face-detector
├─ .gitignore
├─ LICENSE
├─ backend
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
├─ frontend
│  ├─ .eslintrc.json
│  ├─ .gitignore
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
│  │  │     │  └─ detection-table
│  │  │     │     ├─ detection-table.component.tsx
│  │  │     │     └─ styles.module.css
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

<!--The project is deployed using Netlify. You can check it [here](https://curious-wisp-0e847c.netlify.app/). Netlify was chosen due to its availability and being free of charge to some limit.-->

![Application Workflow](https://drive.google.com/uc?id=1Gg6sYDSOhw5sspfGO0_a29dZ-cmCjOdf)
<!--
- **Authentication**: when using the application, you can sign up or sign in to it. If you prefer manually entering the credentials, they will be saved to the cloud firestore. It is required to save the credentials, so you can sign in whenever you want without registering each time. However, manually entering credentials for each service we use is tiring. Therefore, you can sign in using Google provider. A new window will be created where you'll need to choose your google account for service usage. You can checkout this page [here](https://curious-wisp-0e847c.netlify.app/auth).

![Authentication Page Screenshot](https://drive.google.com/uc?id=1OeEOb33P5DizNtIizaWyDSpSEqUOYdlV)

- **Main page**: After signing in or just being on the main page (being authenticated isn't mandatory for the application), you'll see all the categories of products that the clothing store provides. You can checkout this page [here](https://curious-wisp-0e847c.netlify.app/home).

![Main Page Screenshot](https://drive.google.com/uc?id=1M_T1_6TmOkv3Jg5TNERc6-_A748BVXux)

- **Specific Category Page**: By clicking on a category on the main page, you'll be redirected to the chosen category page. You can checkout this page [here](https://curious-wisp-0e847c.netlify.app/category/Mens).

![Mens Category Screenshot](https://drive.google.com/uc?id=1KJLujs-Zci0nhXabej8e7eEsXQtwt8_B)

- **Product Cart**: After hovering on the desired product, you can add it to the cart, which contains all the chosen products in specific amount. (It's located in the upper right corner)

![Product Cart Screenshot](https://drive.google.com/uc?id=1I_nX0W8sAu7pBSkSaEw7MrxLHQhz6PG1)

- **Shop Page**: On the shop page limited amount of each category products is gathered. You can checkout this page [here](https://curious-wisp-0e847c.netlify.app/shop)

![Shop Page Screentshot](https://drive.google.com/uc?id=1w4ja1cEV2F5KPUD7MVs0zGAS6Q6APFM5)

- **Checkout Page**: Through the cart you can get to the checkout page, where chosen products are listed. You can checkout this page [here](https://curious-wisp-0e847c.netlify.app/checkout)

![Checkout Page Screeshot](https://drive.google.com/uc?id=1MttHy7EM0wN4Bxf0QCfp-0dc924CzFDQ)

-->

## Project Optimizations

<!--

+ Web vitals

Here are measurements made with PageSpeed Insights. You can check detailed results [here](https://pagespeed.web.dev/analysis/https-curious-wisp-0e847c-netlify-app/r4iv81jok6?form_factor=desktop).

![PC Performance Screenshot](https://drive.google.com/uc?id=1LlM32TdVDjZQh6sKC1Fdif3V9Jd5QkKK)

![Mobile Performance Screenshots](https://drive.google.com/uc?id=1e5vdudCXKT25-0NOIfZWI-ltM09gSOgi)

> [!TIP]
> As you can see, efficiency isn't great for mobile version. It can be impoved by:
>  + storing images of different sizes in the data storage. This way the amount of data transfered via network is less
>  + using server side rendering. By using this strategy, the server is responsible for rendering, not client's device
>  + using CDN + Redis. It can significantly improve performance as product images are the same for each user, so the caching will be efficient

+ Different screen resolutions

You've previously seen screenshots of the applications made from laptop. Now, I want to demonstrate how the app looks from mobile. 
> [!NOTE]
> The application is created as a progressive web app, so it can be added on the main screen of your device

![Mobile Application Layout Home Page](https://drive.google.com/uc?id=19Pz4HE-fYatwtf3EID8r6q5BGBWuGuqY)
![Mobile Application Layout Shop Page](https://drive.google.com/uc?id=1yB9Zdc_mrZbm82l6mnhxam-Z4ta-6b-c)
![Mobile Application Layout Auth Page](https://drive.google.com/uc?id=1dLS4Ab0Nt8MTAq7zc-Rj3X2hGb9ImZ0t)
![Mobile Application Layout Product Cart](https://drive.google.com/uc?id=12N6X5sgyT-t3wetS7bS2oB364zsqY0Zi)
![Mobile Application Layout Checkout Page](https://drive.google.com/uc?id=1X-Y5DM9qK8W2sDX3siP336x_XLkaEJoI)

+ Partial Rendering

Each page is loaded using lazy loading strategy. The main idea is that the content is loaded not simultaneously from the begining, but by chunks. So the needed page is loaded only when it is needed. More about lazy loading you can read [here](https://en.wikipedia.org/wiki/Lazy_loading).

Code from the application given below. You can check it out [here](https://github.com/SKorchinskiy/Clothing-Store/blob/main/src/routes/index.js).
```
const Home = lazy(() => import("../pages/home/home.page"));
const Auth = lazy(() => import("../pages/auth/auth.page"));
const Shop = lazy(() => import("../pages/shop/shop.page"));
const Checkout = lazy(() => import("../pages/checkout/checkout.page"));
const Category = lazy(() => import("../pages/category/category.page"));
```
Also, during page loading the loader is shown

![Loader Screenshot](https://drive.google.com/uc?id=1UMimf5oBYtximrzGJG86INxBhJUxYIgb)

-->

## Why did I build this project ?

<!--
I built Clothing Store project to improve my skills in web development. This application is the first relatively big application where I've gained lots of skills and knowledge. In the next section I've listed what I've learned during the project building process.
-->
## What did I learn ?
<!--
+ **Technologies**: React, Redux, Redux-Saga, React-Router-Dom, Jest, Testing Library, Cloud Firestore, HTML, CSS
+ **Strategies and Concepts**: lazy loading, serverless functions, page routing, device resolution adaptation, progressive web applications, web vitals optimization, client side rendering, partial rendering, loaders, service workers
-->
