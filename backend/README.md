# Chat Application Backend

This is the backend for a simple chat application built with FastAPI. It provides endpoints for managing chats and
feedback.

## Setup and Installation

1. Create a virtual environment and activate it.
2. Install the required packages by running `pip install -r requirements/dev.txt`.
3. Create a `.env` file in the `backend` directory. You can simply copy `.env.template` into a new `.env` file and fill
   in the required values, such as the `DATABASE_URL` and `FILE_STORAGE_PATH`. Make sure that the directory specified
   in `FILE_STORAGE_PATH` exists.
4. Run the FastAPI application using `uvicorn main:app --reload`.
5. Open your web browser and navigate to`http://localhost:8000/docs` to access Swagger UI.

## API Endpoints

### Chat Endpoints

#### GET /chat/all/{user_uuid}

Retrieves all chats for a given user.

#### POST /chat/new

Creates a new chat.

Request body:

```json
{
  "user_uuid": "string (UUID)",
  "title": "string",
  "submission_type": "internal"
  |
  "external",
  "messages": [
    {
      "content": "string",
      "role": "user"
      |
      "bot"
    }
  ],
  "created_at": "string (ISO datetime, optional)"
}
```

#### PUT /chat/update

Updates an existing chat.
Request body:

```json
{
  "chat_uuid": "string (UUID)",
  "user_uuid": "string (UUID)",
  "title": "string",
  "submission_type": "internal" | "external",
  "messages": [
    {
      "content": "string",
      "role": "user" | "bot"
    }
  ]
}
```

#### DELETE /chat/delete

Deletes a chat.
Request body:

```json
{
  "chat_uuid": "string (UUID)",
  "user_uuid": "string (UUID)"
}
```

#### POST /feedback

Submits feedback with a screenshot.
Request body:

```json
{
  feedback: string,
  user_uuid: string (UUID),
  screenshot: file
}
```
 