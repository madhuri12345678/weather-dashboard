# 🌦️ Weather Dashboard App

A modern React-based weather dashboard built with:
- **React Query** for data caching
- **Supabase** for user login (email & password)
- **OpenWeatherMap API** for weather data
- **React Context API** for state management
- Fully styled with clean CSS and responsive layout

---

## 🚀 Live Preview
You can deploy the app using [Netlify](https://netlify.com/) or [Vercel](https://vercel.com/).

---

## 🧑‍💻 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root:
```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Supabase Setup
- Go to [https://supabase.com](https://supabase.com) → create a new project
- Enable **Email/Password** auth in **Authentication → Settings**
- Get your project URL and anon/public key

In `src/supabaseClient.js`:
```js
const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";
```

### 5. Start the App
```bash
npm start
```

---

## 🔐 Login Info
- Use the sign-up form to create a user account
- Email/password is stored securely via Supabase Auth
- Once logged in, the user is shown the full dashboard

---

## 🧠 Assignment Approach

1. **Functional Components + Hooks**: Entire app is written with functional components and uses `useState`, `useEffect`, and `useContext` hooks.
2. **React Query**: Used to fetch and cache weather + forecast data with auto refetch every 30s.
3. **Supabase Auth**: Handles login/signup logic and protects dashboard routes.
4. **Error Handling**: Dedicated error component for invalid cities or network issues.
5. **Weather Display**: Separate reusable component shows weather + icon.
6. **Forecast**: 5-day forecast displayed with responsive grid.
7. **Extras**: Temperature unit toggle, localStorage, logout support.

---

## 📦 Folder Structure
```
src/
├── components/
│   ├── Login.jsx
│   ├── SearchBar.jsx
│   ├── WeatherDisplay.jsx
│   └── ErrorMessage.jsx
├── context/
│   └── WeatherContext.jsx
├── supabaseClient.js
├── App.js
└── App.css
```

---

## 📄 License
MIT

---

## 🧑‍🎓 Author
Built by **Madhuri Perumandla** as part of a full-stack assignment challenge 🚀
