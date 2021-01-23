// dependencies
import React, { useEffect, useState, Suspense, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faGift,
  faSmile
} from '@fortawesome/free-solid-svg-icons'

// external components
import './Chat.css'
import ChatNavbar from '../../components/chatNavbar/chatNavbar'
import Group from '../../components/group/Group'
import Social from '../../components/social/Social'
import ChatWelcome from '../../components/chatWelcome/ChatWelcome'

// router history
import { useParams } from 'react-router-dom'
// api
import api from '../../services/http/api'
// socket
import socket from '../../services/websocket/socket'

const ChatMessage = React.lazy(() => import('../../components/chatMessage/ChatMessage'))

const Chat = () => {
  const [chat, setChat] = useState({})
  const [text, setText] = useState('')
  const [send, setSend] = useState(false)
  const { friend } = useParams()
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  })

  const createChat = useCallback(async () => {
    try {
      const response = await api.post('/chat/createChat', { friend_id: friend })
      setChat(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [friend])

  const getChat = useCallback(async () => {
    try {
      const response = await api.post('/chat/getChat', { friend_id: friend })
      setChat(response.data)
    } catch (error) {
      if (error.response.data === "chat doesn't exist") {
        createChat()
      }
    }
  }, [createChat, friend])

  useEffect(() => {
    if (mounted.current) {
      document.addEventListener('keyup', (event) => {
        if (event.code === 'Enter' && document.querySelector('.chat-body-input-text').value !== '') {
          setSend(true)
        }
      })

      getChat()
    }
  }, [getChat, mounted])

  useEffect(() => {
    socket.on('newMessage', () => {
      getChat()
    })
  }, [getChat])

  useEffect(() => {
    if (chat.messages !== undefined) {
      if (chat.messages.length > 0) {
        setTimeout(() => {
          scrollBar()
        }, 50)
      }
    }
  }, [chat.messages])

  useEffect(() => {
    if (send && mounted) {
      try {
        const sendMessage = async () => {
          await api.post('/chat/sendMessage', {
            chat_id: chat._id,
            text,
            user: chat.friend._id,
            friend: chat.user._id
          })
        }
        sendMessage()

        document.querySelector('.chat-body-input-text').value = ''
        setSend(false)
        getChat()

        socket.emit('sendMessage', chat.friend._id)
      } catch (error) {
        console.log(error)
      }
    }
  }, [send, getChat, chat, text, mounted])

  const textInput = (event) => {
    setText(event.target.value)
  }

  const scrollBar = () => {
    const objDiv = document.querySelector('.chat-body-main')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  // jsx
  return (
        <div className="Chat">
            <Group/>
            <Social/>

            {
                chat.friend &&

                <div className="chat-body">

                    <ChatNavbar friend={chat.friend} />
                    <div className="chat-body-main">
                        <ChatWelcome friend={chat.friend} />
                        <Suspense fallback={<div>loading...</div>}>
                            <ChatMessage chat={chat} />
                        </Suspense>
                    </div>

                    <div className="chat-body-input">

                        <div className="chat-body-input-margin">
                            <div className="chat-body-input-icon">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <input
                                    className="chat-body-input-text"
                                    name="text"
                                    placeholder={`Message @${chat.friend.name}`}
                                    onChange={textInput}
                                />
                            </div>

                            <div className="chat-body-input-info">
                                <span className="chat-body-input-info-icon">
                                    <FontAwesomeIcon icon={faGift} />
                                </span>
                                <span className="chat-body-input-info-icon">
                                    <FontAwesomeIcon icon={faSmile} />
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            }
        </div>
  )
}

export default Chat
