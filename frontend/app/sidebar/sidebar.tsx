import React from "react";
import { CiCirclePlus } from "react-icons/ci";

import { Chat, UUID } from "../state";
import ChatHistory, { ChatEntryHandlers } from "./chatHistory";
import UserBar, { UserbarHandlers } from "./userBar";

interface SidebarProps {
  chatHandlers: ChatEntryHandlers;
  chats: Array<Chat>;
  userKey: string;
  userbarHandlers: UserbarHandlers;
  selectedChatUUID: UUID;
  onNewChatClicked: () => void;
}

export default function Sidebar({
  chats,
  chatHandlers,
  userKey,
  userbarHandlers,
  selectedChatUUID,
  onNewChatClicked,
}: SidebarProps) {
  return (
    <div className="mx-4 flex flex-col justify-center items-start h-full">
      <div className="mt-4 transitron duration-300 hover:scale-[1.02]">
        <button
          onClick={() => onNewChatClicked()}
          className="text-center flex items-center justify-center text-lg hover:outline hover:outline-2 hover:rounded p-2"
        >
          <CiCirclePlus size={32} />
          <span className="ml-4 text-xl font-bold">New Chat</span>
        </button>
      </div>
      <div className="divider py-4 my-0"></div>
      <div className="flex-grow flex-1 w-full">
        <ChatHistory
          selectedChatUUID={selectedChatUUID}
          handlers={chatHandlers}
          chats={chats}
        />
      </div>
      <div className="divider my-4"></div>
      <div className="mb-4 w-full">
        <UserBar userKey={userKey} handlers={userbarHandlers} />
      </div>
    </div>
  );
}
