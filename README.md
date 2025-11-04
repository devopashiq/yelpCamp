# 🏕️ YelpCamp

YelpCamp is a full-stack web application that allows users to explore, add, and review campgrounds. The project simulates a production-ready review platform for outdoor camping sites — similar to Yelp, but specialized for campers.

---

## 🚀 Features

* 🧭 **Add, edit, and delete campgrounds** with detailed descriptions and images
* 💬 **Review system** for user-generated feedback on campgrounds
* 🔐 **User authentication and authorization** using Passport.js (login, signup, and secure sessions)
* 🗺️ **Interactive maps** using Mapbox API for geolocation and visual campground tagging
* 🗃️ **MongoDB database** for storing user, campground, and review data
* 🧩 **RESTful routes** and modular Express.js architecture for scalability
* 🎨 **EJS templates** for clean, server-side rendering and dynamic UI

---

## 🛠️ Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Frontend       | EJS, Bootstrap, CSS |
| Backend        | Node.js, Express.js |
| Database       | MongoDB, Mongoose   |
| Authentication | Passport.js         |
| Mapping        | Mapbox API          |

---

## 📸 Screenshots

| Feature                | Screenshot                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Home Page**          | <img width="700" alt="Home Page" src="https://github.com/user-attachments/assets/e736798f-156e-47d6-84d5-3584a7a52d5c" />          |
| **Campground Details** | <img width="700" alt="Campground Details" src="https://github.com/user-attachments/assets/78303bd1-d4e8-4042-87b7-7cfadb830cdd" /> |
| **Add Campground**     | <img width="700" alt="Add Campground" src="https://github.com/user-attachments/assets/024a73e3-bdc3-49b7-b344-b95a657b650f" />     |
| **Map Integration**    | <img width="700" alt="Map Integration" src="https://github.com/user-attachments/assets/84649f54-caf2-43d7-a7bc-21327d40ba19" />    |
| **Login Page**         | <img width="700" alt="Login Page" src="https://github.com/user-attachments/assets/dc7703ea-4a71-4eb4-a9f5-811ae9444574" />         |

---

## ⚙️ Installation & Setup

1. **Clone this repository:**

   ```bash
   git clone https://github.com/yourusername/yelpCamp.git
   cd yelpCamp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables:**
   Create a `.env` file and include:

   ```bash
   DATABASE_URL=<your_mongodb_connection_string>
   MAPBOX_TOKEN=<your_mapbox_token>
   SECRET=<your_session_secret>
   ```

4. **Run the app:**

   ```bash
   npm start
   ```

5. Visit the app on `http://localhost:3000`.

---

## 🔒 Authentication Flow

* Users can **register, log in, and log out** securely.
* Campgrounds and reviews can only be edited or deleted by their respective authors.
* Middleware ensures route-level protection and session management.

---

## 🧠 Learnings

* Built a complete **CRUD application** following MVC principles.
* Gained hands-on experience with **Express routing, middleware, and session handling**.
* Integrated **third-party APIs (Mapbox)** for geospatial functionality.
* Learned best practices for **data modeling and authentication** using Mongoose and Passport.js.

---

## 📜 License

This project is for educational purposes, inspired by [Colt Steele’s Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/).

---

## 🙌 Acknowledgements

* [Colt Steele](https://github.com/Colt) – Original project design and guidance
* [Mapbox](https://www.mapbox.com/) – Mapping and geolocation APIs
* [Express.js](https://expressjs.com/) – Backend framework

---

### 👤 Author

**Mhd Ashiq**
Full Stack Developer | Node.js | EJS | MongoDB
📧 [ashiqdevop@gmail.com](mailto:ashiqdevop@gmail.com) | 🌐 [LinkedIn](http://www.linkedin.com/in/mohammed-ashiqp)
