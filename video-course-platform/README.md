# 🎬 React Video Course Platform

A simple and functional **React-based video course platform** that allows users to browse courses, view lessons, play videos, track progress, and add notes.

---

## 👩‍💻 Author
**B.N.S Harshitha**

---

## 🚀 Features

- 📚 Course catalog with search
- 📄 Course detail pages
- 🎥 Video player with controls
- ⏯ Public video API (`window.videoPlayer`)
- 💾 Progress tracking using `localStorage`
- 📝 Notes per lesson
- 🔀 React Router navigation
- 📦 JSON-based mock API

---

## 🛠 Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6)**
- **React Router DOM**
- **HTML5 Video**
- **CSS**
- **LocalStorage**

---

## 📂 Project Structure

video-course-platform/
├── public/
│ ├── api/
│ │ ├── course_1.json
│ │ ├── course_2.json
│ │ └── courses.json
│ └── videos/
│ ├── react_lesson_1.mp4
│ └── css_lesson_1.mp4
│
├── src/
│ ├── pages/
│ │ ├── Catalog.jsx
│ │ ├── CourseDetail.jsx
│ │ └── VideoPlayer.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .gitignore
├── package.json
├── README.md

---

## ▶️ Public Video API

The video player exposes a global API:

```js
window.videoPlayer.play()
window.videoPlayer.pause()
window.videoPlayer.seek(30)

This API is mounted and cleaned up using React useEffect.


---

💾 Progress Tracking

Video progress is saved in localStorage

Resumes playback from last watched position

Notes are saved per lesson



---

🧪 How to Run Locally

npm install
npm run dev

Open browser at:

http://localhost:5173


---

✅ Project Status

✔ Fully functional
✔ No console errors
✔ Clean Git history
✔ Ready for submission


---

📌 Conclusion

This project demonstrates practical usage of React hooks, routing, state management, and media handling in a real-world scenario.

