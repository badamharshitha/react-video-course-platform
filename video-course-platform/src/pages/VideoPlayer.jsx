import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function VideoPlayer() {
  const { courseId, lessonId } = useParams()
  const videoRef = useRef(null)

  const [course, setCourse] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [initialTime, setInitialTime] = useState(0)

  const progressKey = `progress-${courseId}-${lessonId}`

  // =========================
  // FETCH COURSE DATA
  // =========================
  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then(res => res.json())
      .then(data => {
        setCourse(data)
        const lesson = data.lessons.find(l => l.id === Number(lessonId))
        setCurrentLesson(lesson)
      })
  }, [courseId, lessonId])

  // =========================
  // STEP 7 + 8: LOAD SAVED PROGRESS
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem(progressKey)
    const time = saved ? Number(saved) : 0
    setInitialTime(time)

    // expose for testing
    window.getInitialPlaybackTime = () => time

    return () => {
      delete window.getInitialPlaybackTime
    }
  }, [progressKey])

  // =========================
  // APPLY INITIAL TIME
  // =========================
  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime
    }
  }, [initialTime])

  // =========================
  // STEP 7: SAVE PROGRESS EVERY 5s
  // =========================
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const interval = setInterval(() => {
      if (!video.paused) {
        localStorage.setItem(progressKey, Math.floor(video.currentTime))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [progressKey])

  // =========================
  // STEP 10: PUBLIC VIDEO API
  // =========================
  useEffect(() => {
    window.videoPlayer = {
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      togglePlay: () => {
        if (!videoRef.current) return
        videoRef.current.paused
          ? videoRef.current.play()
          : videoRef.current.pause()
      },
      toggleMute: () => {
        if (!videoRef.current) return
        videoRef.current.muted = !videoRef.current.muted
      },
      isPlaying: () => videoRef.current && !videoRef.current.paused,
      isMuted: () => videoRef.current?.muted,
      seek: (time) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time
        }
      }
    }

    return () => {
      delete window.videoPlayer
    }
  }, [])

  // =========================
  // KEYBOARD SHORTCUTS
  // =========================
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault()
        window.videoPlayer?.togglePlay()
      }
      if (e.key === "m") {
        window.videoPlayer?.toggleMute()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  if (!course || !currentLesson) return <p>Loading...</p>

  return (
    <div data-testid="video-player-page">
      <h1>{course.title}</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div data-testid="video-player-container">
          <video
            ref={videoRef}
            src={currentLesson.video_url}
            controls
            width="600"
          />
          <h3>{currentLesson.title}</h3>
        </div>

        <div>
          <ul>
            {course.lessons.map(lesson => (
              <li
                key={lesson.id}
                data-testid={
                  lesson.id === Number(lessonId)
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
    </div>
  )
}
