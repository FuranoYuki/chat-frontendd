// dependencies
import React, { useEffect, useState, Suspense, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faGift,
  faSmile
} from '@fortawesome/free-solid-svg-icons'

// external components
import './Chat.css'
import ChatNavbar from '../../components/chatNavbar/chatNavbar'
import ChatWelcome from '../../components/chatWelcome/ChatWelcome'

// router history
import { useParams } from 'react-router-dom'
// api
import api from '../../services/http/api'
// socket
import socket from '../../services/websocket/socket'
// form
import { useForm } from 'react-hook-form'

const ChatMessage = React.lazy(() => import('../../components/chatMessage/ChatMessage'))

const Chat = () => {
  const [chat, setChat] = useState({})
  const { friend } = useParams()
  const { register, handleSubmit } = useForm()

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
      scrollBar()
    } catch (error) {
      if (error.response.data === "chat doesn't exist") {
        createChat()
      }
    }
  }, [createChat, friend])

  const sendMessage = useCallback(async (data) => {
    try {
      await api.post('/chat/sendMessage', {
        chat_id: chat._id,
        text: data.text,
        user: chat.friend._id,
        friend: chat.user._id
      })
      getChat()
      document.querySelector('.chat-body-input-text').value = ''
      socket.emit('sendMessage', `${chat.friend.name + '' + chat.friend.code}`)
    } catch (error) {
      console.log(error)
    }
  }, [chat])

  useEffect(() => {
    getChat()
    setTimeout(() => {
      scrollBar()
    }, 500)
  }, [getChat])

  useEffect(() => {
    socket.on('newMessage', () => {
      getChat()
    })
  }, [getChat])

  const scrollBar = () => {
    // const objDiv = document.querySelector('.chat-body-main')
    // objDiv.scrollTop = objDiv.scrollHeight
  }

  // jsx
  return (
    <div className="Chat">
        {
          chat.friend &&

          <div className="chat-body">

              <ChatNavbar friend={chat.friend}/>
              <div className="chat-body-main">
                  <ChatWelcome friend={chat.friend} />
                  <Suspense fallback={<div>loading...</div>}>
                      <ChatMessage chat={chat} />
                  </Suspense>
              </div>

              <div className="chat-body-input">

                  <div className="chat-body-input-margin">
                      <form
                        onSubmit={handleSubmit(sendMessage)}
                        className="chat-body-input-icon"
                      >
                          <FontAwesomeIcon icon={faPlusCircle} />
                          <input
                              className="chat-body-input-text"
                              name="text"
                              placeholder={`Message @${chat.friend.name}`}
                              ref={register}
                          />
                          <button style={{ display: 'none' }}></button>
                      </form>

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
