export const sendNewMessage = (message, time) => ({
  type: 'SEND_NEW_MESSAGE',
  message: message,
  time: time
})

export const getUsername = (firstName, lastName, email, image) => ({
  type: 'SAVE_SELECTED_USER_NAME',
  firstName: firstName,
  lastName: lastName,
  email: email,
  image: image
})

export const addConversation = (email) => ({
  type: 'ADD_CONVERSATION',
  email: email
})

export const securityMessages = (security) => ({
  type: 'SECURITY_MESSAGES',
  security: security
})

export const selectBackground = (background, alt) => ({
  type: 'SELECT_BACKGROUND',
  background: background,
  alt: alt
})

export const conversations = (conversations) => ({
  type: 'GET_CONVERSATIONS',
  conversations: conversations
})

export const addNewConversations = (email, image, name) => ({
  type: 'ADD_NEW_CONVERSATION',
  email: email,
  image: image,
  name: name
})

export const getMessageList = (messages) => ({
  type: 'GET_MESSAGE_LIST',
  messages: messages
})

export const getConversationId = (id) => ({
  type: 'GET_CONVERSATION_ID',
  id: id
})
