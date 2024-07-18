import { IconContext } from "react-icons";
import { UUID, Chat } from "../state";
import { groupByDate } from "./datesort";
import { MdDelete } from "react-icons/md";
import { TbRefreshAlert } from "react-icons/tb";
import { ReactElement } from "react";

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
  let internal: string;
  let external: string;
  let syncIcon: ReactElement;
  switch (chat.status) {
    case "synced":
      syncIcon = <></>;
      switch (chat.submissionLocation) {
        case "external":
          internal = "text-xs underline";
          external = "text-xs font-bold text-warning";
          break;
        case "internal":
          internal = "text-xs font-bold text-info";
          external = "text-xs underline";
          break;
        case null:
          throw new Error(`Submitted with null location!`);
      }
      break;
    case "updated":
      syncIcon = (
        <IconContext.Provider
          value={{ style: { verticalAlign: "text-bottom" } }}
        >
          <TbRefreshAlert />
        </IconContext.Provider>
      );
      switch (chat.submissionLocation) {
        case "external":
          internal = "text-xs underline";
          external = "text-xs italic text-warning";
          break;
        case "internal":
          internal = "text-xs italic text-info";
          external = "text-xs underline";
          break;
        default:
          throw new Error(
            `Updated with unknown location! ${chat.submissionLocation}`,
          );
      }
      break;
    case "created":
      syncIcon = <></>;
      internal = "text-xs underline";
      external = "text-xs underline";
      break;
    default:
      throw new Error(`Unhandled case status: ${chat.status}`);
  }

  const titleStyle = selected
    ? "font-bold text-pretty text-lg"
    : "text-pretty text-lg";
  const boxStyle = selected
    ? "mt-4 bg-base-300 rounded p-1 flex flex-col"
    : "mt-4 p-1 flex flex-col";

  return (
    <div className={boxStyle}>
      <li>
        <a
          className="p-0 text-pretty"
          onClick={() => handlers.onChatEntryClicked(chat)}
        >
          <p className={titleStyle}>{chat.title}</p>
        </a>
      </li>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start justify-self-center space-x-1">
          <button
            className={internal}
            onClick={() => handlers.onInternalClicked(chat)}
          >
            Internal
          </button>
          <button
            className={external}
            onClick={() => handlers.onExternalClicked(chat)}
          >
            External
          </button>
          <button onClick={() => handlers.onSyncClicked(chat)}>
            {syncIcon}
          </button>
        </div>
        <button
          className="flex flex-row justify-end self-center"
          onClick={() => handlers.onDeleteClicked(chat)}
        >
          <IconContext.Provider
            value={{
              color: "#fc2c03",
              style: { verticalAlign: "text-bottom" },
            }}
          >
            <MdDelete />
          </IconContext.Provider>
        </button>
      </div>
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
    <details open className="w-full">
      <summary className="w-full font-bold">{datestring}</summary>
      <ul>
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
    <ul className="menu w-full h-full rounded-box">
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
