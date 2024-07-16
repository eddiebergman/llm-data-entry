"use client";

import React from "react";
import NavBar from "./navbar";
import Chat from "./chat";
import UsernamePasswordInput from "./usernamePasswordInput";
import { PLACEHOLDERS, MAKE_IT_A_DIALOGUE_VALUE } from "./constants";
import ChatLog from "./chatlog";
import { v4 as uuidv4 } from "uuid";

const FAKE_FIRST_UUID = uuidv4();
const FAKE_CHAT_MESSAGES: Array<ChatMessages> = [
  {
    uuid: FAKE_FIRST_UUID,
    title: "Some fake chat",
    messages: ["hi", "hello", "world"],
    status: "submitted",
    datestring: new Date().toISOString(),
    submissionLocation: "internal",
  },
  {
    uuid: uuidv4(),
    title: "Some other fake chat",
    messages: ["other", "dother"],
    status: "create",
    datestring: new Date().toISOString(),
    submissionLocation: "external",
  },
  {
    uuid: uuidv4(),
    title: "Last other fake chat",
    messages: ["other", "dother"],
    status: "updated",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  },
];

const fakeChatMessagesMap: Map<UUID, ChatMessages> = new Map();
for (const entry of FAKE_CHAT_MESSAGES) {
  fakeChatMessagesMap.set(entry.uuid, entry);
}

export type UUID = string;
export type Status = "submitted" | "create" | "updated";
type SubmissionLocation = "internal" | "external";

export interface ChatMessages {
  uuid: UUID;
  title: string;
  messages: Array<string>;
  status: Status;
  datestring: string;
  submissionLocation: SubmissionLocation | null;
}

export function createNewChat(): ChatMessages {
  return {
    uuid: uuidv4(),
    title: "",
    messages: ["", ""],
    status: "create",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  };
}

export type ChatLogEntryHighlight =
  | "current"
  | "search"
  | "disabled"
  | "updated";
export interface ChatLogEntry {
  title: string;
  datestring: string;
  highlight: ChatLogEntryHighlight;
}

function App() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [currentChatUUID, setCurrentChatUUID] =
    React.useState<UUID>(FAKE_FIRST_UUID);
  const [userChats, setUserChats] =
    React.useState<Map<UUID, ChatMessages>>(fakeChatMessagesMap);
  const [isChatLogOpen, setMenuOpen] = React.useState(false);
  const [isLoginOpen, setLoginOpen] = React.useState(false);

  function submitCurrentSelection(location: SubmissionLocation) {
    makeAPICall()
    console.log(location);
  }

  return (
    <div>
      <NavBar
        onClearClicked={() => {
          const newChats = new Map(userChats);

          // TODO: delete from backend
          newChats.delete(currentChatUUID);

          const newChat = createNewChat();
          newChats.set(newChat.uuid, newChat);
          setUserChats(newChats)
          setCurrentChatUUID(newChat.uuid)
        }}
        onNewChatClicked={() => {
          const newChat = createNewChat()
          const newUserChats = new Map(userChats)
          newUserChats.set(newChat.uuid, newChat)
          setUserChats(newUserChats)
          setCurrentChatUUID(newChat.uuid)
        }}
        onSubmitExternalClicked={() => submitCurrentSelection("external")}
        onSubmitInternalClicked={() => submitCurrentSelection("internal")}
        onMenuBarClicked={() => setMenuOpen(!isChatLogOpen)}
        onUserProfileClicked={() => setLoginOpen(!isLoginOpen)}
      />
      <div className="flex flex-row h-screen">
        {/* left drawer content */}
        {isChatLogOpen ? (
          <div className="bg-base-200 basis-1/2 mr-8">
            <ChatLog
              userChats={userChats}
              onMenuItemClick={(e, entry) => {
                const selectedChat = userChats.get(entry.uuid);
                if (selectedChat === undefined) {
                  console.error(`Could not find ${entry.title}!`);
                } else {
                  setCurrentChatUUID(entry.uuid);
                }
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
        {/* page content */}
        <div className="container grow mx-auto mt-4">
          <Chat
            chat={userChats.get(currentChatUUID)!}
            placeholders={PLACEHOLDERS}
            makeItADialogueValue={MAKE_IT_A_DIALOGUE_VALUE}
            onMsgChange={(msgIndex, e) => {
              // Select
              const selectedChat = userChats.get(currentChatUUID)!;

              // Update
              let newMessages = selectedChat.messages.slice();
              newMessages[msgIndex] = e.target.value;
              const newChat = { ...selectedChat, messages: newMessages };

              // Set
              const newUserChats = new Map(userChats);
              newUserChats.set(currentChatUUID, newChat);
              setUserChats(newUserChats);
            }}
            onNewMessageClick={() => {
              // Select
              const selectedChat = userChats.get(currentChatUUID)!;

              // Update
              let newMessages = [...selectedChat.messages, ""];
              const newChat = { ...selectedChat, messages: newMessages };

              // Set
              const newUserChats = new Map(userChats);
              newUserChats.set(currentChatUUID, newChat);
              setUserChats(newUserChats);
            }}
            onTitleChange={(newTitle) => {
              // Select
              const selectedChat = userChats.get(currentChatUUID)!;

              // Update
              const newChat = { ...selectedChat, title: newTitle };

              // Set
              const newUserChats = new Map(userChats);
              newUserChats.set(currentChatUUID, newChat);
              setUserChats(newUserChats);
            }}
          />
        </div>
        {/* right drawer content */}
        {isLoginOpen ? (
          <div className="bg-base-200 basis-1/3 ml-8">
            <UsernamePasswordInput
              username={username}
              password={password}
              onUsernameChanged={(e) => setUsername(e.target.value)}
              onPasswordChanged={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

function Page() {
  return <App />;
}

export default Page;
