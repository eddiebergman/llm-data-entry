import { useState } from "react";
import { IconContext } from "react-icons";
import { MdCopyAll } from "react-icons/md";
import { FiDownloadCloud } from "react-icons/fi";

export interface UserbarHandlers {
  onKeyChange: (value: string) => void;
  onRefreshClicked: () => void;
  onCopyClicked: (content: string) => Promise<void>;
}
interface UserbarProps {
  userKey: string;
  handlers: UserbarHandlers;
}
export default function UserBar({ userKey, handlers }: UserbarProps) {
  const [showModel, setShowModel] = useState(false);
  const [modelText, setModalText] = useState("Copied!");

  return (
    <div className="flex flex-row items-center space-x-1 w-full pl-2">
      <button className="btn btn-sm btn-outline">
        <FiDownloadCloud />
      </button>
      <div className="ml-4 flex flex-grow flex-row join">
        <input
          type="text"
          className="join-item input flex-grow input-sm text-black"
          value={userKey}
          onChange={(e) => {
            handlers.onKeyChange(e.target.value);
          }}
        />
        <button
          className="join-item btn btn-sm btn-outline dropdown dropdown-top dropdown-left"
          onClick={() => {
            handlers
              .onCopyClicked(userKey)
              .then(() => setModalText("copied!"))
              .catch(() => setModalText("Could not copy!"))
              .finally(() =>
                setTimeout(() => {
                  setShowModel(false);
                }, 500),
              );
            setShowModel(true);
          }}
        >
          <MdCopyAll />
          {showModel ? (
            <div className="btn btn-outline btn-sm dropdown-content text-left">
              {modelText}
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  );
}
