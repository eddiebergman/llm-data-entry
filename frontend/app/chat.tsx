import React, {
  ChangeEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
} from "react";
import { showError } from "./util";
import Msg from "./message";
import { MdCloudSync } from "react-icons/md";
import { Chat, Role, SubmissionLocation } from "./state";
import {
  TbSquareRoundedLetterI,
  TbSquareRoundedLetterIFilled,
  TbSquareRoundedLetterE,
  TbSquareRoundedLetterEFilled,
} from "react-icons/tb";
import { StateContext } from "./state";
import { PLACEHOLDERS } from "./constants";
import { createChatEndpoint, putChatEndpoint } from "./api";

export default function ChatView({ chat }: { chat: Chat }) {
  const [_, dispatch] = useContext(StateContext);
  const textAreaRefs = useRef<Array<RefObject<HTMLTextAreaElement>>>(
    [...Array(chat.messages.length)].map(() => React.createRef()),
  );

  // Auto-focus first message if it's the only one
  // i.e. on creation
  useEffect(() => {
    if (
      chat &&
      chat.messages.length === 1 &&
      textAreaRefs.current.length > 0 &&
      textAreaRefs.current[0].current
    ) {
      textAreaRefs.current[0].current.focus();
    }
  }, [chat]);

  function setChat(chat: Chat) {
    dispatch({ type: "update-chat", chat: chat });
  }

  function sync(where: SubmissionLocation | null) {
    if (!where) {
      console.error(
        "Should not have synced a chat with no submission location!",
        chat,
      );
      return;
    }
    const updatedChat: Chat = {
      ...chat,
      status: "synced",
      submissionLocation: where,
    };

    dispatch({ type: "update-chat", chat: updatedChat });
    if (chat.status == "created") {
      createChatEndpoint(updatedChat).catch(() => {
        showError("Failed to sync, please try again later!");
        dispatch({ type: "update-chat", chat: chat });
      });
    } else {
      putChatEndpoint(updatedChat).catch(() => {
        showError("Failed to sync, please try again later!");
        dispatch({ type: "update-chat", chat: chat });
      });
    }
  }

  function addNewMessage() {
    setChat({
      ...chat,
      messages: [...chat.messages, { role: newMsgRole, content: "" }],
    });
  }

  function deleteMessage(msgIx: number) {
    setChat({
      ...chat,
      messages: chat.messages.filter((_, index) => index !== msgIx),
    });
  }

  function onEnterPressedInMsg(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    msgIndex: number,
  ) {
    if (e.shiftKey || e.ctrlKey) return;
    e.preventDefault();
    if (e.repeat) return;

    if (msgIndex === 0 && chat.title === "" && chat.messages.length === 1) {
      setChat({
        ...chat,
        title: chat.messages[0].content,
        messages: [...chat.messages, { content: "", role: "bot" }],
      });
      return;
    }

    const nxtIndex = msgIndex + 1;
    if (nxtIndex >= chat.messages.length) {
      addNewMessage();
    } else {
      const nxtRef = textAreaRefs.current[nxtIndex]?.current;
      if (nxtRef) {
        nxtRef.focus();
      }
    }
  }
  const msgs = chat.messages.map((message, msgIndex) => (
    <div
      key={msgIndex}
      className="mt-8 transform-transition focus-within:scale-[1.05] duration-300"
    >
      <Msg
        ref={textAreaRefs.current[msgIndex]}
        msgIndex={msgIndex} // Used for deletion later
        role={message.role}
        value={message.content}
        goNext={
          msgIndex === chat.messages.length - 1 &&
          chat.messages[msgIndex].content.length > 0
            ? addNewMessage
            : null
        }
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              return onEnterPressedInMsg(e, msgIndex);
            case "Delete":
              if (e.shiftKey || e.ctrlKey) return;
              e.preventDefault();
              if (e.repeat) return;
              if (msgIndex === 0 || msgIndex !== chat.messages.length - 1)
                return;

              deleteMessage(msgIndex);
              const prvRefIx = msgIndex - 1;
              const prvRef = textAreaRefs.current[prvRefIx]?.current;
              if (prvRef) {
                prvRef.focus();
              }
          }
        }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          const newChat = { ...chat };
          if (newChat.submissionLocation) {
            newChat.status = "updated";
          }
          newChat.messages[msgIndex].content = e.target.value;
          setChat(newChat);
        }}
        placeholder={
          msgIndex < PLACEHOLDERS.length ? PLACEHOLDERS[msgIndex] : ""
        }
        // If last message
        showDelete={
          msgIndex === chat.messages.length - 1 && chat.messages.length > 2
        }
        onDeletePressed={deleteMessage}
      />
    </div>
  ));

  const title = (
    <div className="w-full items-center transform-transition hover:scale-[1.05] focus-within:scale-[1.05] duration-300">
      <input
        type="text"
        className="border-b-2 border-gray-300 focus:border-blue-500 outline-none grow text-2xl flex-1 w-full space-x-1"
        value={chat.title}
        onChange={(e) =>
          setChat({
            ...chat,
            title: e.target.value,
            status: chat.submissionLocation ? "updated" : "created",
          })
        }
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
        placeholder="Enter a title of your chat..."
      />
    </div>
  );

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
  const clickToSyncButton = (
    <div
      className="mt-4 w-full flex flex-row justify-center animate-pulse"
      onClick={() => sync(chat.submissionLocation)}
    >
      <button
        className={"flex flex-row btn btn-wide btn-sm btn-info btn-outline".concat(
          syncButtonStyle,
        )}
      >
        <MdCloudSync className={`inline text-lg`} />
        <span>Chat was updated, click to sync</span>
      </button>
    </div>
  );

  const newMsgRole: Role = chat.messages.length % 2 === 0 ? "user" : "bot";

  const showSubmit =
    chat.messages.length >= 2 && chat.messages[1].content.length > 0;

  const submissionBar = (
    <div className="flex flex-row justify-center">
      <div className="join mt-4">
        <button
          onClick={() => sync("internal")}
          className={`join-item btn btn-info btn-sm ${chat.submissionLocation !== "internal" && "btn-outline transition hover:scale-125"}`}
        >
          {chat.submissionLocation === "internal" ? (
            <TbSquareRoundedLetterIFilled className="text-lg" />
          ) : (
            <TbSquareRoundedLetterI className="text-lg" />
          )}
          Internal
        </button>
        <button
          onClick={() => sync("external")}
          className={`join-item btn btn-info btn-sm ${chat.submissionLocation !== "external" && "btn-outline transition hover:scale-125"}`}
        >
          {chat.submissionLocation === "external" ? (
            <TbSquareRoundedLetterEFilled className="text-lg" />
          ) : (
            <TbSquareRoundedLetterE className="text-lg" />
          )}
          External
        </button>
        {!chat.submissionLocation ? (
          <label className="join-item pl-4 input-sm input input-bordered border-slate-300">
            Done? Mark this chat as either containing internal or external
            information. You can always update this later!
          </label>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: "update-chat", chat: chat });
              dispatch({ type: "new-chat" });
            }}
            className="pl-4 join-item text-info underline input input-sm input-bordered border-slate-300 transition duration-300 hover:scale-125"
          >
            Press <div className="inline kbd kbd-md">ctrl+m</div>
            for a New Chat
          </button>
        )}
      </div>
    </div>
  );

  const showTitle = chat.messages.length > 1;
  return (
    <div className="w-full">
      <div
        className={`font-bold transition-opacity duration-700 ${showTitle ? "opacity-100" : "opacity-0"}`}
      >
        {title}
      </div>
      <div id="Chat">
        {chat.status === "updated" && clickToSyncButton}
        {msgs}
        {chat.messages.length > 1 && (
          <div
            className={`mt-8 flex flex-col align-middle transition-opacity duration-700 ${showSubmit ? "opacity-100" : "opacity-0 h-0"}`}
          >
            {submissionBar}
          </div>
        )}
      </div>
    </div>
  );
}
