import { BrowserRouter, Routes, Route } from "react-router-dom"
import Catalog from "./pages/Catalog"
import CourseDetail from "./pages/CourseDetail"
import VideoPlayer from "./pages/VideoPlayer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
