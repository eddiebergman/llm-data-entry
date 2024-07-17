import React, { ChangeEvent } from "react";
import Msg from "./message";
import { Chat } from "./state";

interface ChatProps {
  chat: Chat;
  placeholders: Array<string>;
  makeItADialogueValue: string;
  onChatChange: (chat: Chat) => void;
  onNewChatClicked: () => void;
  onSyncChatClicked: (chat: Chat) => void;
}
export default function ChatView({
  chat,
  onChatChange,
  onNewChatClicked,
  onSyncChatClicked,
  makeItADialogueValue,
  placeholders,
}: ChatProps) {
  const newDialogueText =
    chat.messages.length === 2 ? makeItADialogueValue : "+";

  const msgs = chat.messages.map((message, msgIndex) => (
    <div key={msgIndex} className="mt-8">
      <Msg
        msgID={msgIndex} // Used for deletion later
        role={message.role}
        value={message.content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          const currentMsg = chat.messages[msgIndex];
          chat.messages[msgIndex] = {
            ...currentMsg,
            content: e.target.value,
          };
          onChatChange(chat);
        }}
        placeholder={
          msgIndex < placeholders.length ? placeholders[msgIndex] : ""
        }
        // If last message
        showDelete={msgIndex === chat.messages.length - 1}
        onDeletePressed={(msgID) => {
          onChatChange({
            ...chat,
            messages: chat.messages.filter((_, index) => index !== msgID),
          });
        }}
      />
    </div>
  ));
  const newMsgRole = chat.messages.length % 2 === 0 ? "human" : "pretend-bot";
  const newMsgPosition =
    newMsgRole === "human" ? "mt-8 chat chat-end" : "mt-8 chat chat-start";
  const addMsg = (
    <div className={newMsgPosition}>
      <button
        onClick={(_) =>
          onChatChange({
            ...chat,
            messages: [...chat.messages, { role: newMsgRole, content: "" }],
          })
        }
        className="chat-bubble chat-bubble-info w-1/4"
      >
        {newDialogueText}
      </button>
    </div>
  );

  return (
    <div className="w-full">
      <div className="join w-full">
        {chat.status === "updated" ? (
          <button
            className="join-item btn btn-warning"
            onClick={() => onSyncChatClicked(chat)}
          >
            Sync
          </button>
        ) : (
          <></>
        )}
        <div className="join-item w-full bg-base-200 rounded-box">
          <label className="input input-ghost w-full flex items-center space-x-1">
            <input
              type="text"
              className="grow w-full"
              value={chat.title}
              onChange={(e) => onChatChange({ ...chat, title: e.target.value })}
              placeholder="Question about registering late for exams"
            />
          </label>
        </div>
        <button
          className="join-item btn btn-success"
          onClick={() => onNewChatClicked()}
        >
          New Chat
        </button>
      </div>
      <div id="Chat">
        {msgs}
        {addMsg}
      </div>
    </div>
  );
}
