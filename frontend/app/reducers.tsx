import { UUID, Chat, AppState } from "./state";
import { v4 as uuidv4 } from "uuid";

export function createNewChat(): Chat {
  return {
    uuid: uuidv4(),
    title: "Untitled",
    messages: [
      { content: "", role: "human" },
      { content: "", role: "pretend-bot" },
    ],
    status: "created",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  };
}

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
  console.log(action);
  switch (action.type) {
    case "set-current": {
      return { ...state, currentChatUUID: action.uuid };
    }
    case "new": {
      const newChat = createNewChat();
      return {
        currentChatUUID: newChat.uuid,
        chats: [...state.chats, newChat],
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
        chats: newChats,
      };
    }
    case "update": {
      return {
        currentChatUUID: action.chat.uuid,
        chats: state.chats.map((chat) =>
          chat.uuid === action.chat.uuid ? action.chat : chat,
        ),
      };
    }
    default:
      return state;
  }
}
