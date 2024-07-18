import { UUID, Chat, AppState, createNewChat } from "./state";
import { sortedByDate } from "./sidebar/datesort";

export interface SetCurrentChatAction {
  type: "set-current";
  uuid: UUID;
}

export interface NewChatAction {
  type: "new";
}

export interface DeleteChatAction {
  type: "delete";
  uuid: UUID;
}

export interface UpdateChatAction {
  type: "update";
  chat: Chat;
}
export type StateReducerAction =
  | NewChatAction
  | DeleteChatAction
  | UpdateChatAction
  | SetCurrentChatAction;

export function stateReducer(
  state: AppState,
  action: StateReducerAction,
): AppState {
  switch (action.type) {
    case "set-current": {
      return { ...state, currentChatUUID: action.uuid };
    }
    case "new": {
      const newChat = createNewChat();
      return {
        currentChatUUID: newChat.uuid,
        chats: sortedByDate([...state.chats, newChat]),
      };
    }
    case "delete": {
      let toDeleteIx = state.chats.findIndex((chat) => {
        return chat.uuid === action.uuid;
      });

      // Wasn't found?
      if (toDeleteIx === -1) {
        return state;
      }

      let newChats: Array<Chat>;
      let newCurrentChatUUID: UUID;

      if (state.chats.length === 1) {
        // Found, only chat
        const newChat = createNewChat();
        newChats = [newChat];
        newCurrentChatUUID = newChat.uuid;
      } else if (toDeleteIx === 0) {
        // Found, was first chat of many
        newCurrentChatUUID = state.chats[1].uuid;
        newChats = state.chats.filter((chat) => chat.uuid !== action.uuid);
      } else {
        // Found, was not first chat of many
        newCurrentChatUUID = state.chats[toDeleteIx - 1].uuid;
        newChats = state.chats.filter((chat) => chat.uuid !== action.uuid);
      }

      return {
        currentChatUUID: newCurrentChatUUID,
        chats: sortedByDate(newChats),
      };
    }
    case "update": {
      return {
        currentChatUUID: action.chat.uuid,
        chats: sortedByDate(
          state.chats.map((chat) =>
            chat.uuid === action.chat.uuid ? action.chat : chat,
          ),
        ),
      };
    }
    default:
      return state;
  }
}
