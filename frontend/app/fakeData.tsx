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
      { content: "hi", role: "human" },
      { content: "hello", role: "pretend-bot" },
      { content: "me", role: "human" },
    ],
    status: "synced",
    datestring: new Date().toISOString(),
    submissionLocation: "internal",
  },
  {
    uuid: uuidv4(),
    title: "Some other fake chat",
    messages: [
      { content: "hello", role: "human" },
      { content: "world", role: "pretend-bot" },
    ],
    status: "created",
    datestring: new Date().toISOString(),
    submissionLocation: null,
  },
  {
    uuid: uuidv4(),
    title: "Last other fake chat",
    messages: [
      { content: "other", role: "human" },
      { content: "dther", role: "pretend-bot" },
    ],
    status: "updated",
    datestring: new Date().toISOString(),
    submissionLocation: "external",
  },
];

export function createFakeAppState(): AppState {
  return {
    currentChatUUID: FAKE_FIRST_UUID,
    chats: sortedByDate(FAKE_CHAT_MESSAGES),
  };
}
