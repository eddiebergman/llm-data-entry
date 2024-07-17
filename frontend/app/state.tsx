export type UUID = string;
export type Status = "created" | "synced" | "updated";
export type SubmissionLocation = "internal" | "external";
export type Role = "human" | "pretend-bot";
export type ChatLogEntryHighlight =
  | "current"
  | "search"
  | "disabled"
  | "updated";

export interface Message {
  content: string;
  role: Role;
}

export interface UserInfo {
  uuid: UUID;
}
export interface Chat {
  uuid: UUID;
  title: string;
  messages: Array<Message>;
  status: Status;
  datestring: string;
  submissionLocation: SubmissionLocation | null;
}

export interface ChatLogEntry {
  title: string;
  datestring: string;
  highlight: ChatLogEntryHighlight;
}

export interface AppState {
  currentChatUUID: UUID;
  chats: Array<Chat>;
}
