// dependencies
import React, { useEffect, useState, Suspense, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faGift,
  faSmile
} from '@fortawesome/free-solid-svg-icons'
// styles
import styles from './Chat.module.css'
// router history
import { useParams } from 'react-router-dom'
// api
import api from '../../services/http/api'
// socket
import socket from '../../services/websocket/socket'
// form
import { useForm } from 'react-hook-form'
// error
import ErrorHandler from '../../components/errorHandler/ErrorHandler'
// components
import ChatNavbar from '../../components/chatNavbar/chatNavbar'
import ChatWelcome from '../../components/chatWelcome/ChatWelcome'

const ChatMessage = React.lazy(() => import('../../components/chatMessage/ChatMessage'))

const Chat = () => {
  const mounted = useRef(null)
  const bodyMain = useRef(null)
  const { friend } = useParams()
  const socketNewMessage = useRef(false)
  const [chat, setChat] = useState(false)
  const { register, handleSubmit } = useForm()

  const scrollBar = () => {
    bodyMain.current.scrollTop = bodyMain.current.scrollHeight
  }

  const createChat = useCallback(async () => {
    try {
      await api.post('/chat/createChat', { friend_id: friend })
      getChat()
    } catch (error) {
      ErrorHandler(error)
    }
  }, [friend])

  const getChat = useCallback(async () => {
    try {
      const res = await api.post('/chat/getChat', { friend_id: friend })
      setChat(res.data)
      scrollBar()
    } catch (error) {
      if (error.response.data === "chat doesn't exist") {
        createChat()
      } else {
        ErrorHandler(error)
      }
    }
  }, [createChat, friend])

  const newMessage = useCallback(async () => {
    socket.on('newMessage', async () => {
      if (mounted.current) {
        try {
          const res = await api.post('/chat/getLastMessage', { chat_id: chat._id })
          const updatedChat = chat
          updatedChat.messages.push(res.data)
          setChat(Object.assign({}, updatedChat))
          scrollBar()
        } catch (error) {
          ErrorHandler(error)
        }
      }
    })
  }, [chat, mounted])

  const sendMessage = useCallback(async (data) => {
    if (data.text.length > 0) {
      try {
        const res = await api.post('/chat/sendMessage', {
          chat_id: chat._id,
          text: data.text,
          user: chat.friend._id,
          friend: chat.user._id
        })
        const newMessages = chat
        newMessages.messages.push(res.data)
        setChat(Object.assign({}, newMessages))
        document.querySelector('.input_message').value = ''
        socket.emit('sendMessage', `${chat.friend.name + '' + chat.friend.code}`)
        scrollBar()
      } catch (error) {
        ErrorHandler(error)
      }
    }
  }, [chat, scrollBar])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (mounted.current) {
      if (chat && !socketNewMessage.current) {
        socketNewMessage.current = true
        newMessage()
      }
    }
  }, [chat, socketNewMessage])

  useEffect(() => {
    if (mounted.current) {
      getChat()
    }
  }, [friend])

  useEffect(() => {
    if (mounted.current) {
      if (chat.friend) {
        window.document.title = `@${chat.friend.name}`
      }
    }
  }, [chat])

  return (
    <div className={styles.chat}>
      {chat.friend &&

        <div className={styles.chat_body}>

            <ChatNavbar friend={chat.friend} />
            <div className={styles.body_main} ref={bodyMain}>
                <ChatWelcome friend={chat.friend} />
                <Suspense fallback={<div>loading...</div>}>
                    <ChatMessage chat={chat} scroll={scrollBar}/>
                </Suspense>
            </div>

            <div className={styles.body_input}>

              <div className={styles.input_margin}>
                  <form
                    onSubmit={handleSubmit(sendMessage)}
                    className={styles.input_icon}
                  >
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <input
                        name="text"
                        ref={register}
                        autoComplete='off'
                        className={`${styles.input_text} input_message`}
                        placeholder={`Message @${chat.friend.name}`}

                      />
                      <button style={{ display: 'none' }}></button>
                  </form>

                  <div className={styles.input_info}>
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
