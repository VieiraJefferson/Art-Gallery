🚀 Art API
A Node.js project built with Express, using Nodemon for development automation. It features a scalable API for managing and showcasing artworks, with integration to Cloudinary for image storage and MongoDB for database management.

🚀 Technologies Used
Node.js ⚙️

Express 🌐

Nodemon 🔄

MongoDB 🗄️

Mongoose 🦉

Cloudinary ☁️

Dotenv 🔒

CORS 🌍

Axios 📡

JWT (JSON Web Tokens) 🔐

Bcrypt 🔑

Vercel 🚀

📌 Features
✅ Artwork Management 🖼️

✅ Image Upload with Cloudinary ☁️

✅ User Authentication 🔐

✅ Scalable API 📡

✅ Database Management with MongoDB 🗄️

✅ Error Handling 🛠️

✅ Environment Variables with Dotenv 🔒

✅ CORS Support 🌍

📂 Project Structure
Copy
📦 art-api <br>
├── 📁 src <br>
│   ├── 📁 controllers <br>
│   │   ├── artworkController.js <br>
│   │   ├── authController.js <br>
│   ├── 📁 models <br>
│   │   ├── Artwork.js <br>
│   │   ├── User.js <br>
│   ├── 📁 routes <br>
│   │   ├── artworkRoutes.js <br>
│   │   ├── authRoutes.js <br>
│   ├── 📁 middleware  <br>
│   │   ├── authMiddleware.js <br>
│   │   ├── errorHandler.js <br>
│   ├── 📁 utils  <br>
│   │   ├── cloudinary.js  <br>
│   │   ├── logger.js  <br>
│   ├── 📁 config  <br>
│   │   ├── db.js  <br>
│   ├── app.js  <br>
│   ├── server.js  <br>
├── .env  <br>
├── .gitignore  <br>
├── package.json  <br>
└── README.md  <br>
📦 Installation and Execution
Clone the repository:

bash
Copy
git clone https://github.com/VieiraJefferson/Art-API.git
Navigate to the project folder:

bash
Copy
cd Art-API
Install dependencies:

bash
Copy
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
Start the project in development mode:

bash
Copy
npm start
Build the project for production:

bash
Copy
npm run build
🛠️ How to Contribute
Fork the project 🍴

Create a new branch:

bash
Copy
git checkout -b my-new-feature
Commit your changes:

bash
Copy
git commit -m "Adding new feature"
Push to the remote branch:

bash
Copy
git push origin my-new-feature
Open a Pull Request on GitHub! 🚀

📜 License
This project is licensed under the MIT License. Feel free to use and modify it! 😊

🌟 About the Project
The Art API is a robust backend application designed to manage and showcase artworks. It integrates with Cloudinary for seamless image storage and MongoDB for efficient database management. The API supports user authentication, artwork management, and scalable architecture, making it a powerful tool for art-related applications.

🔗 Links
GitHub Repository: Art API

