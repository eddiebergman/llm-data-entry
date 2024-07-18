import React, {
  ChangeEvent,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import Msg from "./message";
import { Chat, SubmissionLocation } from "./state";
import { debounce } from "lodash";

interface ChatHandlers {
  onChatChange: (chat: Chat) => void;
  onNewChatClicked: () => void;
  onSyncChatClicked: (chat: Chat) => void;
  onSubmit: (chat: Chat, location: SubmissionLocation) => void;
}

interface ChatProps {
  chat: Chat;
  handlers: ChatHandlers;
  placeholders: Array<string>;
}
export default function ChatView({ chat, handlers, placeholders }: ChatProps) {
  const textAreaRefs = useRef<Array<RefObject<HTMLTextAreaElement>>>(
    [...Array(chat.messages.length)].map(() => React.createRef()),
  );
  const newMsgRef = useRef<HTMLButtonElement>(null);
  const [userTyping, setUserTyping] = useState(false);

  const newDialogueText =
    chat.messages.length === 0
      ? "Ask a question about the university!"
      : "What does the ideal answer look like?";

  const chatEmpty = chat.title === "" && chat.messages.length <= 1;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUserTyping = useCallback(
    debounce(() => setUserTyping(false), 500),
    [],
  );

  function GoNextMsg() {
    return (
      <button
        onClick={() => addNewMessage()}
        className="text-md text-info underline"
      >
        <div className="inline kbd kbd-md">Enter</div> to add more messages...
      </button>
    );
  }

  function addNewMessage() {
    handlers.onChatChange({
      ...chat,
      messages: [...chat.messages, { role: newMsgRole, content: "" }],
    });
  }

  function deleteMessage(msgIx: number) {
    handlers.onChatChange({
      ...chat,
      messages: chat.messages.filter((_, index) => index !== msgIx),
    });
  }

  function onEnterPressedInMsg(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    msgIndex: number,
  ) {
    if (e.key !== "Enter") return;
    if (e.shiftKey || e.ctrlKey) return;
    e.preventDefault();
    if (e.repeat) return;

    const nxtIndex = msgIndex + 1;
    if (nxtIndex >= textAreaRefs.current.length) {
      addNewMessage();
    } else {
      const nxtRef = textAreaRefs.current[nxtIndex].current;
      if (nxtRef) {
        nxtRef.focus();
      } else {
        addNewMessage();
      }
    }
  }
  function onBackspacePressedInMsg(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    msgIndex: number,
  ) {
    // Don't do backspace behaviour on anything but the last message
    // or the first message
    if (msgIndex == 0 || msgIndex !== chat.messages.length - 1) return;

    const currentMsg = chat.messages[msgIndex];
    if (currentMsg.content.length !== 0) return;

    e.preventDefault();
    const prvIx = msgIndex - 1;
    if (prvIx >= 0 && prvIx < textAreaRefs.current.length) {
      textAreaRefs.current[prvIx].current?.focus();
      deleteMessage(msgIndex);
    }
    return;
  }

  const msgs = chat.messages.map((message, msgIndex) => (
    <div key={msgIndex} className="mt-8">
      <Msg
        ref={textAreaRefs.current[msgIndex]}
        msgIndex={msgIndex} // Used for deletion later
        role={message.role}
        value={message.content}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              return onEnterPressedInMsg(e, msgIndex);
            case "Backspace":
              return onBackspacePressedInMsg(e, msgIndex);
          }
        }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          const currentMsg = chat.messages[msgIndex];
          chat.messages[msgIndex] = {
            ...currentMsg,
            content: e.target.value,
          };
          handlers.onChatChange(chat);
          setUserTyping(true);
          debouncedUserTyping();
        }}
        placeholder={
          msgIndex < placeholders.length ? placeholders[msgIndex] : ""
        }
        // If last message
        showDelete={
          msgIndex === chat.messages.length - 1 && chat.messages.length > 2
        }
        onDeletePressed={deleteMessage}
      />
    </div>
  ));
  const newMsgRole = chat.messages.length % 2 === 0 ? "human" : "pretend-bot";

  let syncButtonStyle: string = "";
  switch (chat.submissionLocation) {
    case "internal": {
      syncButtonStyle = "btn-info";
      break;
    }
    case "external": {
      syncButtonStyle = "btn-warning";
      break;
    }
  }

  let showAddMsg: boolean;
  if (chat.messages.length === 0) {
    showAddMsg = chat.title.length > 1;
  } else if (chat.messages.length === 1) {
    showAddMsg = chat.messages[0].content.length > 1;
  } else {
    showAddMsg = false;
  }

  const showSubmit =
    chat.messages.length >= 2 &&
    chat.messages[1].content.length > 0 &&
    !userTyping;

  return (
    <div className="w-full">
      <div className="join w-full items-center">
        <button
          className="join-item btn btn-success"
          onClick={() => handlers.onNewChatClicked()}
        >
          New Chat
        </button>
        <label className="join-item flex-1 bg-base-200 input input-bordered w-full flex items-center space-x-1">
          <input
            ref={(input) => {
              input && chatEmpty && input.focus();
            }}
            type="text"
            className="grow w-full text-lg"
            value={chat.title}
            onChange={(e) => {
              handlers.onChatChange({ ...chat, title: e.target.value });
              setUserTyping(true);
              debouncedUserTyping();
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                return;
              }
              if (e.shiftKey || e.ctrlKey || e.repeat) {
                return;
              }
              e.preventDefault();
              if (chat.messages.length == 0) {
                addNewMessage();
              } else if (textAreaRefs.current.length > 0) {
                textAreaRefs.current[0].current?.focus();
              }
            }}
            placeholder="Enter a title and press Enter"
          />
        </label>
      </div>
      <div id="Chat">
        {chat.status === "updated" ? (
          <div className="mt-4 flex flex-row justify-center animate-pulse">
            <button
              className={"join-item btn btn-wide btn-outline".concat(
                syncButtonStyle,
              )}
              onClick={() => handlers.onSyncChatClicked(chat)}
            >
              Chat was updated, click to sync
            </button>
          </div>
        ) : (
          <></>
        )}
        {msgs}
        {chat.messages.length > 1 && (
          <div
            className={`flex flex-col align-middle transition-opacity duration-700 ${showSubmit ? "opacity-100" : "opacity-0 h-0"}`}
          >
            <div className="divider"></div>
            <div className="flex flex-row justify-center">
              <div className="join mt-4">
                <button
                  onClick={() => handlers.onSubmit(chat, "internal")}
                  className={`join-item transition-opacity duration-700 opacity-100 btn ${chat.submissionLocation !== "internal" && "btn-outline"} btn-info btn-sm`}
                >
                  Internal
                </button>
                <button
                  onClick={() => handlers.onSubmit(chat, "external")}
                  className={`join-item btn ${chat.submissionLocation !== "external" && "btn-outline"} btn-warning btn-sm`}
                >
                  External
                </button>
                {!chat.submissionLocation ? (
                  <label className="pl-4 join-item input-sm input input-bordered">
                    Done? Mark this chat as either containing internal or
                    external information. You can always update this later!
                  </label>
                ) : (
                  <button
                    onClick={() => handlers.onNewChatClicked()}
                    className="pl-4 join-item text-success underline input input-sm input-bordered"
                  >
                    Press <div className="inline kbd kbd-md">ctrl+m</div>
                    for a New Chat
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-row justify-center">
              <GoNextMsg />
            </div>
          </div>
        )}
        {showAddMsg && (
          <div className="flex flex-row w-full justify-center items-center">
            <div
              className={"flex flex-col align-middle mt-8 w-full".concat(
                ` transition-opacity duration-700 ${showAddMsg && !userTyping ? "opacity-100" : "opacity-0 h-0"}`,
              )}
            >
              <button
                ref={newMsgRef}
                onClick={() => addNewMessage()}
                className="chat-bubble chat-bubble-info w-1/4"
              >
                {newDialogueText}
              </button>
              <div className="mt-4">
                <GoNextMsg />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
