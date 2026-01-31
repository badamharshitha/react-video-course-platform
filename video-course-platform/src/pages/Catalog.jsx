import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Catalog() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/courses.json")
      .then(res => res.json())
      .then(data => setCourses(data))
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div data-testid="catalog-page">
      <h2>Course Catalog</h2>

      <input
        data-testid="search-input"
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div>
        {filteredCourses.map(course => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            data-testid={`course-card-${course.id}`}
            style={{ display: "block", margin: "10px 0" }}
          >
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
