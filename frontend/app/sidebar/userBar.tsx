import { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { MdQuestionMark, MdCloudSync, MdCopyAll } from "react-icons/md";
import { getChatsEndpoint } from "../api";
import { Userkey, StateContext } from "../state";
import { useTranslation } from "react-i18next";

export default function UserBar() {
  const { t } = useTranslation();
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
        toast.error(t("failedToRetrieveChats"), {
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
        setUserkey(state.userkey);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex flex-row items-center space-x-1 w-full">
      <div className="flex grow flex-row join">
        <HelpModal />
        <input
          type="text"
          className="join-item input w-4/6 input-sm text-black"
          value={userkey}
          onChange={(e) => setUserkey(e.target.value)}
        />
        <CopyButton userkey={userkey} />
      </div>
      <div className="">
        {loading ? (
          <button className="btn btn-sm btn-outline">
            <span className="loading loading-spinner loading-xs"></span>
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline"
            onClick={submitAndDownload}
          >
            <MdCloudSync />
          </button>
        )}
      </div>
    </div>
  );
}

function HelpModal() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <label
      className="join-item relative btn btn-outline btn-sm"
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}
    >
      <MdQuestionMark />
      {showModal && (
        <div className="absolute text-black bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 text-sm">
          {t("helpUserkey")}
        </div>
      )}
    </label>
  );
}

function CopyButton({ userkey }: { userkey: Userkey }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [copiedModal, setCopiedModal] = useState("Copied!");

  return (
    <button
      className="join-item btn btn-sm btn-outline dropdown dropdown-top dropdown-right"
      onClick={() => {
        navigator.clipboard
          .writeText(userkey)
          .then(() => setCopiedModal(t("copied")))
          .catch(() => setCopiedModal(t("couldNotCopy")))
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
