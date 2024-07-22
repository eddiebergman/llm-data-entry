import { Chat, Userkey } from "./state";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export const sendFeedbackEndpoint = async (
  userkey: Userkey,
  feedback: string,
  image: File | null,
): Promise<void> => {
  try {
    const url = `${BASE_URL}/feedback?user_uuid=${encodeURIComponent(
      userkey,
    )}&feedback=${encodeURIComponent(feedback)}`;

    let options: RequestInit = { method: "POST" };
    if (image) {
      const formData = new FormData();
      formData.append("screenshot", image);
      options.body = formData;
    }
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error fetching chats:", err);
    throw err;
  }
};

export const getChatsEndpoint = async (userkey: Userkey): Promise<Chat[]> => {
  try {
    const response = await fetch(`${BASE_URL}/chat/all/${userkey}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // NOTE: we don't do any runtime validatoin and we expect the server
    // to give back nice responses...
    const chats: any[] = await response.json();

    const parsedChats: Chat[] = chats.map((body) => ({
      userkey: userkey,
      uuid: body.chat_uuid,
      title: body.title,
      messages: body.messages,
      status: "synced",
      datestring: body.created_at,
      submissionLocation: body.submission_type,
    }));
    return parsedChats;
  } catch (err) {
    console.error("Error fetching chats:", err);
    throw err;
  }
};

export const createChatEndpoint = async (chat: Chat): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/chat/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: chat.title,
        messages: chat.messages,
        submission_type: chat.submissionLocation,
        created_at: chat.datestring,
        user_uuid: chat.userkey,
        chat_uuid: chat.uuid,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error updating chats", err);
    throw err;
  }
};

export const putChatEndpoint = async (chat: Chat): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/chat/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: chat.title,
        messages: chat.messages,
        submission_type: chat.submissionLocation,
        user_uuid: chat.userkey,
        chat_uuid: chat.uuid,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error updating chats", err);
    throw err;
  }
};

export const deleteChatEndpoint = async (chat: Chat): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/chat/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error deleting chat", err);
    throw err;
  }
};
