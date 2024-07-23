import { useContext } from "react";
import { ChatUUID, Chat, StateContext, SubmissionLocation } from "../state";
import { groupByDate, showError } from "../util";
import { HiOutlineXCircle } from "react-icons/hi2";
import { MdCloudSync } from "react-icons/md";
import {
  TbSquareRoundedLetterI,
  TbSquareRoundedLetterIFilled,
  TbSquareRoundedLetterE,
  TbSquareRoundedLetterEFilled,
} from "react-icons/tb";
import { deleteChatEndpoint, putChatEndpoint } from "../api";

interface ChatEntryProps {
  selected: boolean;
  chat: Chat;
}

export function ChatEntry({ selected, chat }: ChatEntryProps) {
  const [_, dispatch] = useContext(StateContext);

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

    putChatEndpoint(updatedChat).catch(() => {
      showError("Failed to sync, please try again later!");
      dispatch({ type: "update-chat", chat: chat });
    });
  }
  function select() {
    dispatch({ type: "set-current", uuid: chat.uuid });
  }
  function deleteChat() {
    dispatch({ type: "delete-chat", uuid: chat.uuid });
    if (chat.status !== "created") {
      deleteChatEndpoint(chat).catch(() => {
        showError("Failed to delete chat remotely, please try again later!");
        dispatch({ type: "update-chat", chat: chat });
      });
    }
  }

  const bar = (
    <span className={`ml-1 ${selected ? "text-3xl" : "text-lg"}`}>|</span>
  );

  return (
    <div className="flex flex-col space-y-1 px-4">
      <li>
        <div
          className={`flex w-full flex-row space-x-1 justify-start items-center ${selected ? "border-b-2" : ""}`}
        >
          <div className="flex flex-grow items-center">
            {chat.status === "updated" && (
              <button>
                <MdCloudSync
                  className="text-lg text-warning flex-shrink-0"
                  onClick={() => sync(chat.submissionLocation)}
                />
              </button>
            )}
            {chat.status === "updated" && bar}
            {chat.submissionLocation === "internal" ? (
              <TbSquareRoundedLetterIFilled className="text-lg flex-shrink-0" />
            ) : (
              <button>
                <TbSquareRoundedLetterI
                  className="text-lg flex-shrink-0"
                  onClick={() => sync("internal")}
                />
              </button>
            )}
            {chat.submissionLocation === "external" ? (
              <TbSquareRoundedLetterEFilled className="text-lg flex-shrink-0" />
            ) : (
              <button>
                <TbSquareRoundedLetterE
                  className="text-lg flex-shrink-0"
                  onClick={() => sync("external")}
                />
              </button>
            )}
            {bar}
            <p
              className={`ml-2 line-clamp-1 cursor-pointer  ${selected ? "font-bold text-2xl" : "text-xl hover:scale-[1.05]"} ${!chat.title && "text-info"}`}
              onClick={select}
            >
              {chat.title ? chat.title : "<empty>"}
            </p>
          </div>
          <HiOutlineXCircle
            className="text-error text-lg cursor-pointer flex-shrink-0"
            onClick={deleteChat}
          />
        </div>
      </li>
    </div>
  );
}

interface ChatEntrySectionProps {
  selectedChatUUID: ChatUUID;
  chats: Array<Chat>;
  datestring: string;
}

function ChatEntrySection({
  selectedChatUUID,
  chats,
  datestring,
}: ChatEntrySectionProps) {
  // TODO: Sort by date here
  return (
    <details open>
      <summary className="m-4 text-xl font-bold">{datestring}</summary>
      <ul className="space-y-4">
        {chats.map((chat) => {
          return (
            <ChatEntry
              selected={chat.uuid === selectedChatUUID}
              key={chat.uuid}
              chat={chat}
            />
          );
        })}
      </ul>
      <div className="divider"></div>
    </details>
  );
}

export default function ChatHistory() {
  const [state, _] = useContext(StateContext);

  const chatsByDate = groupByDate(state.chats, "day");

  return (
    <ul className="flex flex-col rounded-box">
      {Object.entries(chatsByDate).map(([date, entries]) => (
        <ChatEntrySection
          key={date}
          selectedChatUUID={state.currentChatUUID}
          chats={entries}
          datestring={date}
        />
      ))}
    </ul>
  );
}
