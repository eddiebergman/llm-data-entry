import React from "react";
import { Chat, UUID } from "../state";
import ChatHistory, { ChatEntryHandlers } from "./chatHistory";
import UserBar, { UserbarHandlers } from "./userBar";

interface SidebarProps {
  chatHandlers: ChatEntryHandlers;
  chats: Array<Chat>;
  userKey: string;
  userbarHandlers: UserbarHandlers;
  selectedChatUUID: UUID;
}

export default function Sidebar({
  chats,
  chatHandlers,
  userKey,
  userbarHandlers,
  selectedChatUUID,
}: SidebarProps) {
  return (
    <div>
      <UserBar userKey={userKey} handlers={userbarHandlers} />
      <div className="divider">Chats</div>
      <ChatHistory
        selectedChatUUID={selectedChatUUID}
        handlers={chatHandlers}
        chats={chats}
      />
    </div>
  );
}
