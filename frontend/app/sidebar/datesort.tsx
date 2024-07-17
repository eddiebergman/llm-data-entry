import { parseISO, format } from "date-fns";

// ChatGPT
import { Chat } from "../state";

// Function to group objects by a date part
export function groupByDate(
  chats: Array<Chat>,
  datePart: "day" | "month" | "year",
): Record<string, Chat[]> {
  let groups: Record<string, Chat[]> = {};
  chats.forEach((entry, _uuid) => {
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
  });
  return groups;
}
