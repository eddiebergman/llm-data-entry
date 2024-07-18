"use client";

import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatView from "./chat";
import { PLACEHOLDERS, MAKE_IT_A_DIALOGUE_VALUE } from "./constants";
import Sidebar from "./sidebar/sidebar";
import { createFakeAppState, FAKE_USERKEY } from "./fakeData";
import { stateReducer } from "./reducers";
import Footer from "./footer";
import { AppState, UUID, createNewState } from "./state";

const APP_STATE_STORAGE_KEY = "appState";
const USER_KEY_STORAGE_KEY = "userKey";

function getAppStateStorage(): AppState {
  if (typeof window === "undefined") return createNewState();

  const storedData = localStorage.getItem(APP_STATE_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return createNewState();
}

function putUserKeyStorage(userkey: UUID): void {}
function getUserKeyStorage(): UUID {
  if (typeof window === "undefined") return uuidv4();

  const storedData = localStorage.getItem(APP_STATE_STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return uuidv4();
}

function putAppStateStorage(userkey: UUID, appState: AppState): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("appState", JSON.stringify(appState));
}

function App() {
  const [appState, dispatchState] = useReducer(
    stateReducer,
    createFakeAppState(),
  );

  // TODO: Make sure to use cache if available
  const [userKey, setUserKey] = useState<string>(FAKE_USERKEY);

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.ctrlKey && event.key === "m") {
        event.preventDefault();
        dispatchState({ type: "new" });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sidebar = (
    <Sidebar
      userKey={userKey}
      userbarHandlers={{
        onKeyChange: (value) => setUserKey(value),
        onRefreshClicked: () => {
          // TODO: Load new chats
        },
        onCopyClicked: (content) => {
          return navigator.clipboard.writeText(content);
        },
      }}
      selectedChatUUID={appState.currentChatUUID}
      chatHandlers={{
        onInternalClicked: (chat) => {
          dispatchState({
            type: "update",
            chat: {
              ...chat,
              submissionLocation: "internal",
              status: "synced",
            },
          });
          // TODO: Send to backend
        },
        onExternalClicked: (chat) => {
          dispatchState({
            type: "update",
            chat: {
              ...chat,
              submissionLocation: "external",
              status: "synced",
            },
          });
          // TODO: Send to backend
        },
        onSyncClicked: (chat) => {
          dispatchState({
            type: "update",
            chat: { ...chat, status: "synced" },
          });
          // TODO: Send to backend
        },
        onDeleteClicked: (chat) =>
          dispatchState({ type: "delete", uuid: chat.uuid }),
        onChatEntryClicked: (chat) =>
          dispatchState({ type: "set-current", uuid: chat.uuid }),
      }}
      chats={appState.chats}
    />
  );

  const chatView = (
    <ChatView
      chat={
        appState.chats.find((chat) => chat.uuid === appState.currentChatUUID)!
      }
      handlers={{
        onNewChatClicked() {
          dispatchState({ type: "new" });
        },
        onSyncChatClicked(chat) {
          dispatchState({
            type: "update",
            chat: { ...chat, status: "synced" },
          });
          // TODO: Send to backend
        },
        onChatChange(chat) {
          if (chat.status === "synced") {
            chat.status = "updated";
          }
          dispatchState({ type: "update", chat: chat });
        },
        onSubmit(chat, location) {
          dispatchState({
            type: "update",
            chat: {
              ...chat,
              submissionLocation: location,
              status: "synced",
            },
          });
          // TODO: Send to backend
        },
      }}
      placeholders={PLACEHOLDERS}
    />
  );

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/3 px-4 bg-base-200">{sidebar}</div>
      <div className="flex w-full flex-col h-screen">
        <main className="flex-1 p-4 overflow-y-auto">{chatView}</main>
        <footer className="flex flex-row-reverse py-4">
          <div className="px-4">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
}

function Page() {
  return <App />;
}

export default Page;
