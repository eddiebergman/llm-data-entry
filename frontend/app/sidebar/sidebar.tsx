import React, { useContext } from "react";
import { CiCirclePlus } from "react-icons/ci";

import ChatHistory from "./chatHistory";
import UserBar from "./userBar";
import { StateContext } from "../state";

export default function Sidebar() {
  const [_, dispatch] = useContext(StateContext);

  return (
    <div className="mx-4 flex flex-col justify-center items-start h-full">
      <div className="mt-4 transitron duration-300 hover:scale-[1.02]">
        <button
          onClick={() => dispatch({ type: "new-chat" })}
          className="text-center flex items-center justify-center text-lg hover:outline hover:outline-2 hover:rounded p-2"
        >
          <CiCirclePlus size={32} />
          <span className="ml-4 text-xl font-bold">New Chat</span>
        </button>
      </div>
      <div className="divider py-4 my-0"></div>
      <div className="flex-grow flex-1 w-full">
        <ChatHistory />
      </div>
      <div className="divider my-4"></div>
      <div className="mb-4 w-full">
        <UserBar />
      </div>
    </div>
  );
}
