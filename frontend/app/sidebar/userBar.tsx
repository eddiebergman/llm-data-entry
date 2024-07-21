import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { MdCopyAll } from "react-icons/md";
import { MdCloudSync } from "react-icons/md";
import { getChatsEndpoint } from "../api";
import { Userkey, StateContext } from "../state";

export default function UserBar() {
  const [state, dispatch] = useContext(StateContext);

  // Notably, this will only do anything when the download is hit.
  const [userkey, setUserkey] = useState(state.userkey);
  const [loading, setLoading] = useState(false);

  function submitAndDownload() {
    setLoading(true);
    getChatsEndpoint(userkey)
      .then((newChats) =>
        dispatch({
          type: "user-key-change",
          userkey: userkey,
          chats: newChats,
        }),
      )
      .catch((_) => {
        toast.error("Failed to retrieve chats, please try again later!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex flex-row items-center space-x-1 w-full pl-2">
      <div className="ml-4 flex flex-grow flex-row join">
        <CopyButton userkey={userkey} />
        <input
          type="text"
          className="join-item input flex-grow input-sm text-black"
          onChange={(e) => setUserkey(e.target.value)}
        />
      </div>
      {loading ? (
        <button className="btn btn-sm btn-outline">
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      ) : (
        <button className="btn btn-sm btn-outline" onClick={submitAndDownload}>
          <MdCloudSync />
        </button>
      )}
    </div>
  );
}

function CopyButton({ userkey }: { userkey: Userkey }) {
  const [showModal, setShowModal] = useState(false);
  const [copiedModal, setCopiedModal] = useState("Copied!");

  return (
    <button
      className="join-item btn btn-sm btn-outline dropdown dropdown-top dropdown-right"
      onClick={() => {
        navigator.clipboard
          .writeText(userkey)
          .then(() => setCopiedModal("copied!"))
          .catch(() => setCopiedModal("Could not copy!"))
          .finally(() =>
            setTimeout(() => {
              setShowModal(false);
            }, 500),
          );
        setShowModal(true);
      }}
    >
      <MdCopyAll />
      {showModal ? (
        <div className="btn btn-outline btn-sm dropdown-content text-left">
          {copiedModal}
        </div>
      ) : (
        <></>
      )}
    </button>
  );
}
