"use client";

import React, { useReducer, useState } from "react";
import NavBar from "./navbar";
import ChatView from "./chat";
import { PLACEHOLDERS, MAKE_IT_A_DIALOGUE_VALUE } from "./constants";
import Sidebar from "./sidebar/sidebar";
import { createFakeAppState, FAKE_USERKEY } from "./fakeData";
import { stateReducer } from "./reducers";

function App() {
  const [appState, dispatchState] = useReducer(
    stateReducer,
    createFakeAppState(),
  );

  // TODO: Make sure to use cache if available
  const [userKey, setUserKey] = useState<string>(FAKE_USERKEY);
  const [isChatLogOpen, setMenuOpen] = React.useState(true);

  return (
    <div>
      <NavBar
        onNewChatClicked={() => dispatchState({ type: "new" })}
        onMenuBarClicked={() => setMenuOpen(!isChatLogOpen)}
      />
      <div className="flex flex-row h-screen">
        {/* left drawer content */}
        {isChatLogOpen ? (
          <div className="bg-base-200 w-1/3 basis-1/2 mr-8">
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
          </div>
        ) : (
          <div></div>
        )}
        {/* page content */}
        <div className="container grow mx-auto mt-4">
          <ChatView
            chat={
              appState.chats.find(
                (chat) => chat.uuid === appState.currentChatUUID,
              )!
            }
            onChatChange={(chat) => {
              if (chat.status === "synced") {
                chat.status = "updated";
              }
              dispatchState({ type: "update", chat: chat });
            }}
            placeholders={PLACEHOLDERS}
            makeItADialogueValue={MAKE_IT_A_DIALOGUE_VALUE}
          />
        </div>
      </div>
    </div>
  );
}

function Page() {
  return <App />;
}

export default Page;
