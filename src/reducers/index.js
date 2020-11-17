import { combineReducers } from 'redux'
import authUser from './authUser'
import foundUsers from './foundUsers'
import conversations from './conversations'
import messages from './messages'
import activeConversation from './activeConversation'
import activeConversationMessages from './activeConversationMessages'

export default combineReducers({
    authUser,
    foundUsers,
    conversations,
    activeConversation,
    activeConversationMessages,
    messages,
})