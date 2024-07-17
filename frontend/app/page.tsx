"use client";

import React, { useReducer, useState } from "react";
import ChatView from "./chat";
import { PLACEHOLDERS, MAKE_IT_A_DIALOGUE_VALUE } from "./constants";
import Sidebar from "./sidebar/sidebar";
import { createFakeAppState, FAKE_USERKEY } from "./fakeData";
import { stateReducer } from "./reducers";
import Feedback from "./feedback";

function App() {
  const [appState, dispatchState] = useReducer(
    stateReducer,
    createFakeAppState(),
  );

  // TODO: Make sure to use cache if available
  const [userKey, setUserKey] = useState<string>(FAKE_USERKEY);

  const sidebar = (
    <Sidebar
      userKey={userKey}
      userbarHandlers={{
        onKeyChange: (value) => setUserKey(value),
        onRefreshClicked: () => {
          // TODO: Load new chats
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
      onNewChatClicked={() => dispatchState({ type: "new" })}
      onSyncChatClicked={(chat) => {
        dispatchState({
          type: "update",
          chat: { ...chat, status: "synced" },
        });
        // TODO: Send to backend
      }}
      onChatChange={(chat) => {
        if (chat.status === "synced") {
          chat.status = "updated";
        }
        dispatchState({ type: "update", chat: chat });
      }}
      placeholders={PLACEHOLDERS}
      makeItADialogueValue={MAKE_IT_A_DIALOGUE_VALUE}
    />
  );

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/3 px-4 bg-base-300">{sidebar}</div>
      <div className="flex w-full flex-col h-screen">
        <main className="flex-1 p-4 overflow-y-auto">{chatView}</main>
        <footer className="flex flex-row-reverse py-4">
          <div className="px-4">
            <Feedback />
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
