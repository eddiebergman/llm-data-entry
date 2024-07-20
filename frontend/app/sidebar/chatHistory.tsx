import { UUID, Chat } from "../state";
import { groupByDate } from "./datesort";
import { HiOutlineXCircle } from "react-icons/hi2";
import { MdCloudSync } from "react-icons/md";
import {
  TbSquareRoundedLetterI,
  TbSquareRoundedLetterIFilled,
  TbSquareRoundedLetterE,
  TbSquareRoundedLetterEFilled,
} from "react-icons/tb";

export interface ChatEntryHandlers {
  onInternalClicked: (entry: Chat) => void;
  onExternalClicked: (entry: Chat) => void;
  onSyncClicked: (entry: Chat) => void;
  onDeleteClicked: (entry: Chat) => void;
  onChatEntryClicked: (entry: Chat) => void;
}

interface ChatEntryProps {
  selected: boolean;
  chat: Chat;
  handlers: ChatEntryHandlers;
}

export function ChatEntry({ selected, chat, handlers }: ChatEntryProps) {
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
                  onClick={() => handlers.onSyncClicked(chat)}
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
                  onClick={() => handlers.onInternalClicked(chat)}
                />
              </button>
            )}
            {chat.submissionLocation === "external" ? (
              <TbSquareRoundedLetterEFilled className="text-lg flex-shrink-0" />
            ) : (
              <button>
                <TbSquareRoundedLetterE
                  className="text-lg flex-shrink-0"
                  onClick={() => handlers.onExternalClicked(chat)}
                />
              </button>
            )}
            {bar}
            <p
              className={`ml-2 line-clamp-1 cursor-pointer  ${selected ? "font-bold text-2xl" : "text-xl hover:scale-[1.05]"} ${!chat.title && "text-info"}`}
              onClick={() => handlers.onChatEntryClicked(chat)}
            >
              {chat.title ? chat.title : "<empty>"}
            </p>
          </div>
          <HiOutlineXCircle
            className="text-error text-lg cursor-pointer flex-shrink-0"
            onClick={() => handlers.onDeleteClicked(chat)}
          />
        </div>
      </li>
    </div>
  );
}

interface ChatEntrySectionProps {
  handlers: ChatEntryHandlers;
  selectedChatUUID: UUID;
  chats: Array<Chat>;
  datestring: string;
}

function ChatEntrySection({
  handlers,
  selectedChatUUID,
  chats,
  datestring,
}: ChatEntrySectionProps) {
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
              handlers={handlers}
            />
          );
        })}
      </ul>
      <div className="divider"></div>
    </details>
  );
}

interface ChatHistoryProps {
  handlers: ChatEntryHandlers;
  chats: Array<Chat>;
  selectedChatUUID: UUID;
}

export default function ChatHistory({
  selectedChatUUID,
  chats,
  handlers,
}: ChatHistoryProps) {
  const chatsByDate = groupByDate(chats, "day");

  return (
    <ul className="flex flex-col rounded-box">
      {Object.entries(chatsByDate).map(([date, entries]) => (
        <ChatEntrySection
          key={date}
          selectedChatUUID={selectedChatUUID}
          handlers={handlers}
          chats={entries}
          datestring={date}
        />
      ))}
    </ul>
  );
}
