import { v4 as uuidv4 } from "uuid";
import { Chat, SubmissionLocation, Userkey } from "./state";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;

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
    console.log(chat);
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
    console.log(chat);
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
  console.log(`Sending ${chat}`);
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

export async function dummyFetch<T>(
  endpoint: string,
  body: RequestInit,
  response: T,
  error: boolean = false,
  timeout: number = 500,
): Promise<Response> {
  fetch;
  const url = BASE_URL.concat(endpoint);
  console.log(`Sending to ${url}\n ${body.body}`);

  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error("Network response was not ok"));
      } else {
        const responseBody = JSON.stringify(response);
        const wrappedResponse = new Response(responseBody, {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "application/json",
          },
        });
        resolve(wrappedResponse);
      }
    }, timeout);
  });
}

export const dummyDeleteChatEndpoint = async (chat: Chat): Promise<void> => {
  const error = chat.title === "no delete";
  console.log(`Sending ${chat}`);
  try {
    const response = await dummyFetch(
      `/chat/delete`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      { user_uuid: chat.userkey, chat_uuid: chat.uuid },
      error,
      500,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error deleting chat", err);
    throw err;
  }
};

export const dummyPutChatEndpoint = async (chat: Chat): Promise<void> => {
  const error = chat.title === "fail me";
  console.log(`Sending ${chat}`);
  try {
    const response = await dummyFetch(
      `/chat/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
      {
        title: chat.title,
        messages: chat.messages,
        submission_type: chat.submissionLocation,
        user_uuid: chat.userkey,
        chat_uuid: chat.uuid,
      },
      error,
      500,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return;
  } catch (err) {
    console.error("Error updating chats", err);
    throw err;
  }
};

// TODO REMOVE FROM HERE, FAKE DATA FOR TESTING
export const dummyGetChatsEndpoint = async (
  userkey: Userkey,
): Promise<Chat[]> => {
  let fakeResponse = [];
  let error = false;
  switch (userkey) {
    case "cat":
      fakeResponse = CAT_DUMMY_CHAT_RESPONSE;
      break;
    case "dog":
      fakeResponse = DOG_DUMMY_CHAT_RESPONSE;
      break;
    case "other":
      fakeResponse = OTHER_DUMMY_CHAT_RESPONSE;
      break;
    case "error":
      error = true;
      break;
    default:
      break;
  }
  try {
    const response = await dummyFetch(
      `/chat/all/${userkey}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
      fakeResponse,
      error,
      500,
    );
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

export function dummyChatResponse(
  title: string,
  contents: string[],
  where: SubmissionLocation = "internal",
  uuid: string | null = null,
): any {
  const created_at = new Date().toISOString();
  return {
    title: title,
    messages: contents.map((content, i) => ({
      content: content,
      role: i % 2 === 0 ? "user" : "bot",
    })),
    submission_type: where,
    chat_uuid: uuid ? uuid : uuidv4(),
    created_at: created_at,
    updated_at: created_at,
  };
}

const DUMMY_CHAT_RESPONSE = [
  dummyChatResponse("chat1-cat", ["t1", "t2", "t3"], "internal", "uuid1"),
  dummyChatResponse("chat2-cat", ["t1", "t2", "t3"], "external", "uuid2"),
  dummyChatResponse("chat3-dog", ["t1", "t2", "t3"], "external", "uuid3"),
  dummyChatResponse("chat4-dog", ["t1", "t2", "t3"], "internal", "uuid4"),
  dummyChatResponse("chat5-dog", ["t1", "t2", "t3"], "internal", "uuid5"),
  dummyChatResponse("chat5-other", ["t1", "t2", "t3"], "internal", "uuid6"),
];

const CAT_DUMMY_CHAT_RESPONSE = DUMMY_CHAT_RESPONSE.slice(0, 2);
const DOG_DUMMY_CHAT_RESPONSE = DUMMY_CHAT_RESPONSE.slice(2, 6);
const OTHER_DUMMY_CHAT_RESPONSE = DUMMY_CHAT_RESPONSE.slice(7, 8);
