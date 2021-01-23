import React, { useEffect } from 'react'

import './testAudio.css'

const TestAudio = () => {
//   const [video, setVideo] = useState({})
//   const [audio, setAudio] = useState({})

  useEffect(() => {
    getUserMedia()
  }, [])

  const getUserMedia = async () => {
    try {
      const user = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      const videoGrid = document.querySelector('.testAudio')

      const myVideo = document.createElement('video')
      myVideo.srcObject = user
      myVideo.addEventListener('loadedmetadata', () => {
        myVideo.play()
      })
      videoGrid.append(myVideo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="testAudio">

        </div>
  )
}

export default TestAudio
