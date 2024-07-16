GET /chat/{user-uuid} => list<chat>
POST /feedback => feedback
    {
        user-uuid: string,
        feedback: string,
        screenshots: /image TODO: How does this get encoded?
    }
POST /chat-new => chat
    {
        user-uuid: string,
        ...chat
    }
PUT /chat-update => chat
    {
        user-uuid: string,
        ...chat
    }
DELETE /chat-delete => chat
    {
        user-uuid: string,
        chat-uuid: string,
    }

---

export type UUID = string;
export type Status = "submitted" | "create" | "updated";
type SubmissionLocation = "internal" | "external";

Message {
    content: string
    role: "user" | "bot"
}
Chat {
    user-uuid: UUID;
    chat-uuid: UUID;
    datestring: string;
    title: string;
    messages: Array<Message>;
    submissionLocation: SubmissionLocation;
}
