import { v4 as uuidv4 } from "uuid";
import { AppState, Chat } from "./state";
import { sortedByDate } from "./sidebar/datesort";

export const FAKE_FIRST_UUID = uuidv4();
export const FAKE_USERKEY = uuidv4();
export const FAKE_CHAT_MESSAGES: Array<Chat> = [
  {
    uuid: FAKE_FIRST_UUID,
    title: "Some fake chat",
    messages: [
      { content: "hi", role: "user" },
      { content: "hello", role: "bot" },
      { content: "me", role: "user" },
    ],
    status: "synced",
    datestring: new Date().toISOString(),
    submissionLocation: "internal",
  },
  {
    uuid: uuidv4(),
    title: "Some other fake chat",
    messages: [
      { content: "hello", role: "user" },
      { content: "world", role: "bot" },
    ],
    status: "created",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  },
  {
    uuid: uuidv4(),
    title: "Last other fake chat",
    messages: [
      { content: "other", role: "user" },
      { content: "dther", role: "bot" },
    ],
    status: "updated",
    datestring: new Date().toISOString(),
    submissionLocation: "external",
  },
];

export function createFakeAppState(): AppState {
  return {
    userkey: FAKE_USERKEY,
    currentChatUUID: FAKE_FIRST_UUID,
    chats: sortedByDate(FAKE_CHAT_MESSAGES),
  };
}
