## 🧠 Health Habit Tracker

A full-stack health tracking application where users can:

* Sign up/login securely
* Submit daily inputs like sleep, water, meals, workout
* Get AI-powered health suggestions using Gemini API
* View tips under categories like Sleep Improvement, Diet Tip, and Workout Suggestion

---

#### YT [Video demo](https://youtu.be/T5UKa8ZUhCA)


## 📁 Folder Structure

```
.
├── Frontent/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Static images or icons
│   │   ├── atom/                    # Recoil atoms for global state
│   │   │   ├── authAtom.js
│   │   │   └── userAtom.js
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/
│   │   │   │   ├── button.jsx
│   │   │   │   ├── color-mode.jsx
│   │   │   │   ├── field.jsx
│   │   │   │   ├── input-group.jsx
│   │   │   │   ├── menu.jsx
│   │   │   │   ├── password-input.jsx
│   │   │   │   ├── provider.jsx       # ChakraProvider with theme
│   │   │   │   ├── theme.js           # Chakra custom theme
│   │   │   │   ├── toaster.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LoginCard.jsx
│   │   │   ├── SignupCard.jsx
│   │   ├── hooks/
│   │   │   └── useShowToast.js        # Custom Chakra toast hook
│   │   ├── pages/
│   │   │   ├── AuthPages.jsx          # Auth (Login/Signup) layout
│   │   │   └── Dashboard.jsx          # Main dashboard with form + AI suggestions
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx                   # Entry point (ReactDOM)
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── Server/
│   ├── config/
│   │   └── gemini.js                 # Gemini API integration logic
│   ├── controller/
│   │   └── suggestsionController.js  # Controller for AI suggestions
│   ├── db/
│   │   └── connectDB.js              # MongoDB connection logic
│   ├── middlewares/
│   │   └── protectRoute.js           # Auth middleware using JWT
│   ├── models/
│   │   └── userModel.js              # Mongoose schema for User
│   ├── routes/
│   │   ├── generateRoute.js          # Route for AI suggestions
│   │   └── userRoutes.js             # Auth routes (signup/login)
│   ├── utils/
│   │   └── generateTokenAndSetCookie.js  # JWT token generator
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                     # Main Express server entry
```

---

## 🚀 Features

* 🔐 **Authentication** with JWT and cookies
* 🌙 **Dark Mode** using Chakra UI (customized theme)
* 🧠 **AI Integration** with Gemini for real-time suggestions
* 📝 **Health Form** with inputs: sleep, water, meals, workout
* 📦 Built using **Vite + React + Recoil** (Frontend) and **Express + MongoDB** (Backend)

---

## ⚙️ Tech Stack

| Tech       | Purpose                      |
| ---------- | ---------------------------- |
| React      | UI Rendering                 |
| Chakra UI  | UI components + theme        |
| Recoil     | State management             |
| Vite       | Frontend bundler             |
| Node.js    | Backend runtime              |
| Express    | API server                   |
| MongoDB    | Database                     |
| JWT        | Authentication               |
| Gemini API | Health suggestion generation |

---

## 🔑 Environment Variables

Create a `.env` in `/Server`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API=your_gemini_api_key
```

---

## 🛠️ How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/health-habit-tracker
cd health-habit-tracker
```

---

### 2. Install dependencies

**Frontend:**

```bash
cd Frontent
npm install
```

**Backend:**

```bash
cd ../Server
npm install
```

---

### 3. Run the app

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
node server.js
# or nodemon if installed
```

---

## 📬 API Endpoints

### 🔐 Auth

* `POST /api/users/signup`
* `POST /api/users/login`

### 🧠 AI Suggestion

* `POST /api/generate`
  **Body:**

  ```json
  {
    "prompt": "sleep:6hrs, water:1.5ltr, meals:3, workout:30min, age:22"
  }
  ```

---

