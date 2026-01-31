import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function VideoPlayer() {
  const { courseId, lessonId } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error(err))
  }, [courseId])

  if (!course) {
    return <p>Loading course...</p>
  }

  const currentLesson = course.lessons.find(
    l => String(l.id) === String(lessonId)
  )

  if (!currentLesson) {
    return <p>Lesson not found</p>
  }

  return (
    <div data-testid="video-player-page">
      <h2>{course.title}</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Video */}
        <div data-testid="video-player-container">
          <video
            width="400"
            controls
            src={currentLesson.video_url}
            onTimeUpdate={(e) => {
              const time = Math.floor(e.target.currentTime)
              localStorage.setItem(
                `progress-${courseId}-${lessonId}`,
                time
              )
            }}
          />
          <p>{currentLesson.title}</p>
        </div>

        {/* Sidebar */}
        <ul>
          {course.lessons.map(lesson => (
            <li
              key={lesson.id}
              data-testid={
                lesson.id === currentLesson.id
                  ? "current-lesson-item"
                  : undefined
              }
            >
              <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
