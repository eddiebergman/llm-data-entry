import React, { useContext, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

import ChatHistory from "./chatHistory";
import UserBar from "./userBar";
import { StateContext } from "../state";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const [_, dispatch] = useContext(StateContext);

  const chats = (
    <div className="flex-grow overflow-y-auto overflow-x-clip w-full">
      <ChatHistory />
    </div>
  );

  const newChat = (
    <div className="mt-4 transitron duration-300 hover:scale-[1.02]">
      <button
        onClick={() => dispatch({ type: "new-chat" })}
        className="text-center flex items-center justify-center text-lg hover:outline hover:outline-2 hover:rounded p-2"
      >
        <CiCirclePlus size={32} />
        <span className="ml-4 text-xl font-bold">{t("newChat")}</span>
      </button>
    </div>
  );
  const userBar = (
    <div className="flex-none mb-4 w-full">
      <UserBar />
    </div>
  );

  return (
    <div className="px-4 w-full bg-base-300 justify-center items-start h-screen text-base-content flex flex-col">
      {newChat}
      <div className="divider py-4 my-0"></div>
      {chats}
      <div className="divider my-4"></div>
      {userBar}
    </div>
  );
}
