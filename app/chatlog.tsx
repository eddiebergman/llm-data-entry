import React from "react";
import { ChatMessages, UUID } from "./page";
import { parseISO, format } from "date-fns";

interface MenuItemProps {
  entry: ChatMessages,
  onMenuItemClick: (e: any, entry: ChatMessages) => void;
}
export function MenuItem({ entry, onMenuItemClick }: MenuItemProps) {
  let className: string;
  switch (entry.status) {
    case "submitted":
      className = "ml-4 bg-primary";
      break;
    case "updated":
      className = "ml-4 bg-secondary";
      break;
    case "create":
      className = "ml-4";
      break;
  }

  return (
    <li className={className} onClick={(e) => onMenuItemClick(e, entry)}>
      <a>{entry.title}</a>
    </li>
  );
}

interface ChatLogProps {
  onMenuItemClick: (e: any, entry: ChatMessages) => void;
  userChats: Map<UUID, ChatMessages>
}

// ChatGPT
// Function to group objects by a date part
const groupByDate = (
  objects: Map<UUID, ChatMessages>,
  datePart: "day" | "month" | "year",
): Record<string, ChatMessages[]> => {
  let groups: Record<string, ChatMessages[]> = {}
  objects.forEach((entry, _uuid) => {
      // Parse the date string to a Date object
      const date = parseISO(entry.datestring);

      // Format the date based on the desired part
      let key: string;
      if (datePart === "day") {
        key = format(date, "yyyy-MM-dd");
      } else if (datePart === "month") {
        key = format(date, "yyyy-MM");
      } else {
        key = format(date, "yyyy");
      }

      // Initialize the group if not already present
      if (!groups[key]) {
        groups[key] = [];
      }

      // Add the object to the group
      groups[key].push(entry);
  })
  return groups
};

export default function ChatLog({
  userChats,
  onMenuItemClick,
}: ChatLogProps) {
  const sortedChatEntries = groupByDate(userChats, "day");
  return (
    <ul className="menu w-full h-full rounded-box">
      {Object.entries(sortedChatEntries).map(
        ([date, entries], sectionIndex) => {
          return (
            <li className="w-full" key={sectionIndex}>
              <details open className="w-full">
                <summary className="w-full font-bold">{date}</summary>
                <ul>
                  {entries.map((item, itemIndex) => {
                    return (
                      <MenuItem
                        key={itemIndex}
                        entry={item}
                        onMenuItemClick={onMenuItemClick}
                      />
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        },
      )}
    </ul>
  );
}
