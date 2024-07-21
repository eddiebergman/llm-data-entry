"use client";
import { v4 as uuidv4 } from "uuid";
import React, { createContext, useEffect, useReducer, useState } from "react";

export type ChatUUID = string;
export type Userkey = string;
export type Status = "created" | "synced" | "updated";
export type SubmissionLocation = "internal" | "external";
export type Role = "user" | "bot";
export type ChatLogEntryHighlight =
  | "current"
  | "search"
  | "disabled"
  | "updated";

export interface Message {
  content: string;
  role: Role;
}

export interface Chat {
  userkey: Userkey;
  uuid: ChatUUID;
  title: string;
  messages: Array<Message>;
  status: Status;
  datestring: string;
  submissionLocation: SubmissionLocation | null;
}

export interface ChatLogEntry {
  title: string;
  datestring: string;
  highlight: ChatLogEntryHighlight;
}

export interface AppState {
  userkey: Userkey;
  madeFirstSubmission: boolean;
  currentChatUUID: ChatUUID;
  chats: Map<ChatUUID, Chat>;
}

export function createNewChat(userkey: Userkey): Chat {
  return {
    userkey: userkey,
    uuid: uuidv4(),
    title: "",
    messages: [{ content: "", role: "user" }],
    status: "created",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  };
}

export interface SetCurrentChatAction {
  type: "set-current";
  uuid: ChatUUID;
}

export interface NewChatAction {
  type: "new-chat";
}

export interface DeleteChatAction {
  type: "delete-chat";
  uuid: ChatUUID;
}

export interface UpdateChatAction {
  type: "update-chat";
  chat: Chat;
}

export interface UserKeyUpdated {
  type: "user-key-change";
  userkey: Userkey;
  chats: Array<Chat>;
}
export type Action =
  | NewChatAction
  | DeleteChatAction
  | UpdateChatAction
  | SetCurrentChatAction
  | UserKeyUpdated;

export function createNewState(): AppState {
  const newUserkey = uuidv4();
  const newChat = createNewChat(newUserkey);
  const chats = new Map();
  chats.set(newChat.uuid, newChat);

  return {
    madeFirstSubmission: false,
    userkey: newUserkey,
    currentChatUUID: newChat.uuid,
    chats: chats,
  };
}

export const APP_STATE_STORAGE_KEY = "appState";

export function fromStorage(
  key: string,
  initializer: () => AppState,
): AppState {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const data = JSON.parse(storedData);
      data.chats = new Map(data.chats);
      console.log(`Got from localStorage at'${key}'`);
      return data;
    }
    console.log(`Nothing in localStorage at '${key}'`);
  } catch (error) {
    console.error(`Error getting from localStorage '${key}'\n${error}`);
  }
  return initializer();
}

export function toStorage(key: string, item: AppState): void {
  try {
    const data = { ...item, chats: [...item.chats] };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting item into local storage'${key}'\n${error}`);
  }
}

// This takes care of both updates and additions
function updateChats(
  chats: Map<ChatUUID, Chat>,
  chat: Chat,
): Map<ChatUUID, Chat> {
  return new Map([...chats, [chat.uuid, chat]]);
}

function deleteFromChats(
  chats: Map<ChatUUID, Chat>,
  uuid: ChatUUID,
): Map<ChatUUID, Chat> {
  const newMap = new Map(chats);
  const success = newMap.delete(uuid);
  if (!success) {
    console.error("Failed to find and remove chat", uuid);
  }
  return newMap;
}

function getFirstChat(chats: Map<ChatUUID, Chat>): [ChatUUID, Chat] {
  // NOTE: Not actually first, just **a chat**, could be improved at some
  // point
  const iterator = chats.entries();
  const firstEntry = iterator.next().value;
  if (firstEntry) {
    return firstEntry;
  }
  throw new Error("chats was empty when trying to get first item!");
}

export function stateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set-current": {
      return { ...state, currentChatUUID: action.uuid };
    }
    case "new-chat": {
      const newChat = createNewChat(state.userkey);
      return {
        madeFirstSubmission: true,
        userkey: state.userkey,
        currentChatUUID: newChat.uuid,
        chats: updateChats(state.chats, newChat),
      };
    }
    case "delete-chat": {
      let chats = deleteFromChats(state.chats, action.uuid);

      if (chats.size === 0) {
        const newChat = createNewChat(state.userkey);
        chats = updateChats(chats, newChat);
        return {
          madeFirstSubmission: true,
          userkey: state.userkey,
          currentChatUUID: newChat.uuid,
          chats: chats,
        };
      }

      const [chatuuid, _] = getFirstChat(chats);
      return {
        madeFirstSubmission: true,
        userkey: state.userkey,
        currentChatUUID: chatuuid,
        chats: chats,
      };
    }
    case "update-chat": {
      return {
        madeFirstSubmission: action.chat.submissionLocation
          ? true
          : state.madeFirstSubmission,
        userkey: state.userkey,
        currentChatUUID: action.chat.uuid,
        chats: updateChats(state.chats, action.chat),
      };
    }
    case "user-key-change": {
      // To resolve incoming chats, we make sure that if any of them match
      // by (userkey, chatuid), then we prefer to take the ones that are
      // incoming. Otherwise, we can just blend the two without issue.
      const chats = new Map();
      for (const incoming of action.chats) {
        chats.set(incoming.uuid, incoming);
      }

      let newCurrentChatUUID: ChatUUID;
      if (chats.size === 0) {
        const newChat = createNewChat(action.userkey);
        chats.set(newChat.uuid, newChat);
        newCurrentChatUUID = newChat.uuid;
      } else if (chats.has(state.currentChatUUID)) {
        newCurrentChatUUID = state.currentChatUUID;
      } else {
        const [uuid, _] = getFirstChat(chats);
        newCurrentChatUUID = uuid;
      }

      return {
        madeFirstSubmission: true,
        userkey: action.userkey,
        currentChatUUID: newCurrentChatUUID,
        chats: chats,
      };
    }
    default:
      const exhuastiveCheck: never = action;
      throw new Error(`Unhandled case: ${exhuastiveCheck}`);
  }
}

const initial: [AppState, React.Dispatch<Action>] = [
  createNewState(),
  () => null,
];
// We set this later anywho...
export const StateContext = createContext(initial);

// TODO: any
export function StateProvider({ children }: any) {
  // Set the hydrated flag to true after the component has mounted
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const initializer = () => {
    return fromStorage(APP_STATE_STORAGE_KEY, createNewState);
  };
  const [state, dispatch] = useReducer(stateReducer, undefined, initializer);

  // Save to local storage on state update
  useEffect(() => toStorage(APP_STATE_STORAGE_KEY, state), [state]);

  if (!hydrated) {
    return <div>Loading</div>;
  }

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}
