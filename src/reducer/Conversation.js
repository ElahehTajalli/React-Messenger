import ContactImage from '../photos/5337490ca1097befda8a3a81e0b77af4.jpg'
import ContactImage1 from '../photos/1494085820_norbert-therapy-dog-cute.jpg'
import ContactImage2 from '../photos/cute-dog-yorkie-600x600.jpg'
import image1 from '../photos/wooden-table-product-background_53876-90059.jpg'

const initial = {
  time: '',
  firstName: '',
  lastName: '',
  image: '',
  messageList: [
    {
      text: 'salam',
      time: '12:03',
      sender: 1,
      receiver: 3
    },
    {
      text: 'salam',
      time: '12:03',
      sender: 3,
      receiver: 1
    },
    {
      text: 'khoobi?',
      time: '12:04',
      sender: 1,
      receiver: 3
    },
    {
      text: 'Are',
      time: '12:07',
      sender: 3,
      receiver: 1
    }
  ],
  conversationList: [
    {
      image: ContactImage,
      name: 'zahra',
      lastName: 'kabiri',
      time: '12:01',
      email: '@zahrakbri',
      preview: 'zahra: hi',
      unseen: '1'
    },
    {
      image: ContactImage1,
      name: 'melika',
      lastName: 'ranjbar',
      time: '05:10',
      email: '@melirj',
      preview: 'melika: hello',
      unseen: '6'
    }
  ],
  security: false,
  background: image1,
  alt: 'backGround',
  conversations: [],
  messages: []
}

const conversation = (state = initial, action) => {
  switch (action.type) {
    case 'SEND_NEW_MESSAGE':
      return {
        ...state,
        messageList: [...state.messageList, {
          text: action.message,
          time: new Date().getHours() + ':' + new Date().getMinutes(),
          sender: 1,
          receiver: 3
        }]
      }
    case 'SAVE_SELECTED_USER_NAME':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        image: action.image
      }
    case 'ADD_CONVERSATION' :
      return {
        ...state,
        conversationList: [{
          image: ContactImage2,
          name: 'Maryam',
          lastName: 'Azimi',
          time: '',
          email: action.email,
          preview: '',
          unseen: ''
        }, ...state.conversationList]
      }
    case 'SECURITY_MESSAGES':
      return {
        ...state,
        security: action.security
      }
    case 'SELECT_BACKGROUND':
      return {
        ...state,
        background: action.background,
        alt: action.alt
      }
    case 'GET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations
      }
    case 'addNewConversation':
      return {
        ...state,
        conversations: [
          {
            image: action.image,
            name: action.name,
            lastName: '',
            time: '',
            email: action.email,
            preview: '',
            unseen: ''
          }, ...state.conversations
        ]
      }
    case 'GET_MESSAGE_LIST' :
      return {
        ...state,
        // messages: [...state.messages, action.messages]
        messages: [action.messages]
      }
    case 'GET_CONVERSATION_ID' :
      return {
        ...state,
        id: action.id
      }

    default:
      return state
  }
}

export default conversation
