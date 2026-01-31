import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function VideoPlayer() {
  const { courseId, lessonId } = useParams()
  const videoRef = useRef(null)

  const [course, setCourse] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [initialTime, setInitialTime] = useState(0)

  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState([])

  const progressKey = `progress-${courseId}-${lessonId}`
  const notesKey = `notes-${courseId}-${lessonId}`

  // Fetch course data
  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then(res => res.json())
      .then(data => {
        setCourse(data)
        const found = data.lessons.find(
          l => l.id === Number(lessonId)
        )
        setLesson(found)
      })
  }, [courseId, lessonId])

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(progressKey)
    const time = saved ? Number(saved) : 0
    setInitialTime(time)

    window.getInitialPlaybackTime = () => time
    return () => delete window.getInitialPlaybackTime
  }, [progressKey])

  // Apply saved time
  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime
    }
  }, [initialTime])

  // Save progress every 5s
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const interval = setInterval(() => {
      if (!video.paused) {
        localStorage.setItem(
          progressKey,
          Math.floor(video.currentTime)
        )
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [progressKey])

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem(notesKey)
    if (saved) setNotes(JSON.parse(saved))
  }, [notesKey])

  // Add note
  const addNote = () => {
    if (!noteText || !videoRef.current) return

    const newNote = {
      time: Math.floor(videoRef.current.currentTime),
      text: noteText
    }

    const updated = [...notes, newNote]
    setNotes(updated)
    localStorage.setItem(notesKey, JSON.stringify(updated))
    setNoteText("")
  }

  // Public video API
  useEffect(() => {
    console.log("✅ videoPlayer API mounted")

    window.videoPlayer = {
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time
        }
      }
    }

    return () => {
      console.log("❌ videoPlayer API removed")
      delete window.videoPlayer
    }
  }, [])

  if (!course || !lesson) return <p>Loading...</p>

  return (
    <div>
      <h1>{course.title}</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <video
            ref={videoRef}
            src={lesson.video_url}
            controls
            width="600"
          />
          <h3>{lesson.title}</h3>
        </div>

        <ul>
          {course.lessons.map(l => (
            <li key={l.id}>
              <Link to={`/courses/${courseId}/lessons/${l.id}`}>
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <h3>Notes</h3>

      <input
        placeholder="Write a note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map((note, i) => (
          <li key={i}>
            [{note.time}s] {note.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
