import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then(res => res.json())
      .then(data => setCourse(data))
  }, [courseId])

  if (!course) return <p>Loading...</p>

  return (
    <div data-testid="course-detail-page">
      <h2 data-testid="course-title">{course.title}</h2>
      <p>{course.description}</p>

      <h3>Lessons</h3>
      <ul>
        {course.lessons.map(lesson => (
          <li key={lesson.id}>
            <Link
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              data-testid={`lesson-link-${lesson.id}`}
            >
              {lesson.title} ({lesson.duration})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
