import React, { ChangeEvent, MouseEventHandler, ReactElement } from "react";
import { HumanMsg, LlmMsg } from "./message";
import { ChatMessages } from "./page";



interface ChatProps {
  chat: ChatMessages,
  placeholders:  Array<string>
  makeItADialogueValue: string
  onMsgChange: (msgIndex: number, event: ChangeEvent<HTMLTextAreaElement>) => void
  onTitleChange: (value: string) => void
  onNewMessageClick: MouseEventHandler<HTMLButtonElement>;
}
export default function Chat({ chat, onMsgChange, onTitleChange, onNewMessageClick, makeItADialogueValue, placeholders}: ChatProps) {

  function makeMsg(
    content: string,
    msgIndex: number,
  ): ReactElement<typeof HumanMsg | typeof LlmMsg> {
    const isHuman = (msgIndex % 2 === 0)
    const props = {
      value: content,
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => onMsgChange(msgIndex, e),
      placeholder: ""
    }
    if (msgIndex < placeholders.length) {
      props.placeholder = placeholders[msgIndex]
    }
    return (isHuman)? <HumanMsg key={msgIndex} {...props}/> : <LlmMsg key={msgIndex} { ...props }/>
  }

  const position = chat.messages.length % 2 === 0 ? "chat chat-end" : "chat chat-start";
  const newDialogueText = chat.messages.length == 2? makeItADialogueValue : "+"
  const addMsg = (
    <div className={position}>
      <button onClick={onNewMessageClick} className="chat-bubble chat-bubble-info w-1/4">
        {newDialogueText}
      </button>
    </div>
  );

  return (
    <div>
      <div className="bg-base-200 rounded-box">
        <label className="input input-ghost flex items-center space-x-1">
          <input
            type="text"
            className="grow"
            value={chat.title}
            onChange={(e) => {onTitleChange(e.target.value)}}
            placeholder="Question about registering late for exams"
          />
        </label>
      </div>
      <div id="Chat">
        {chat.messages.map(makeMsg)}
        {addMsg}
      </div>
    </div>
  );
}
