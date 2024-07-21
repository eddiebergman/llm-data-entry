import React, { useContext, useEffect } from "react";
import ChatView from "./chat";
import Sidebar from "./sidebar/sidebar";
import Footer from "./footer";
import { StateContext } from "./state";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <div className="flex flex-row h-screen">
      <div className="w-2/5 bg-base-300 h-screen overflow-y-auto text-base-content overflow-x-clip">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col h-screen">
        <main className="flex-1 py-8 px-20 overflow-y-auto">
          <ChatView chat={state.chats.get(state.currentChatUUID)!} />
        </main>
        <footer className="flex flex-row-reverse py-4">
          <div className="px-4">
            <Footer />
          </div>
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
