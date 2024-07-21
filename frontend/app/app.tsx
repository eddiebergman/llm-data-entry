import React, { useContext, useEffect } from "react";
import ChatView from "./chat";
import Sidebar from "./sidebar/sidebar";
import Footer from "./footer";
import { StateContext } from "./state";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";

export default function App() {
  const [state, dispatch] = useContext(StateContext);

  // Ctrl + m to create a new chat
  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.ctrlKey && event.key === "m") {
        event.preventDefault();
        dispatch({ type: "new-chat" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const showSidebar = state.madeFirstSubmission;

  return (
    <div className="flex flex-row h-screen">
      <div
        className={` transition-all overflow-hidden duration-700 ease-in-out ${
          showSidebar ? "w-2/5 translate-x-0" : "w-0 -translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      <div className="flex w-full flex-col h-screen">
        <main className="flex-1 py-8 px-20 overflow-y-auto">
          <ChatView chat={state.chats.get(state.currentChatUUID)!} />
        </main>
        <footer className="flex flex-row-reverse px-4 py-4 h-16">
          <Footer />
        </footer>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
