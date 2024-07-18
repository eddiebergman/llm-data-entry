import { useState } from "react";
import { IconContext } from "react-icons";
import { MdCopyAll } from "react-icons/md";

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
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center space-x-1 ml-2 mt-4">
        <button className="btn btn-outline btn-sm">Get Chats</button>
        <input
          type="text"
          value={userKey}
          onChange={(e) => {
            handlers.onKeyChange(e.target.value);
          }}
          className="input input-sm input-bordered w-2/3 max-w-xs"
        />
        <button
          className="btn btn-sm dropdown dropdown-bottom"
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
          <IconContext.Provider
            value={{ style: { verticalAlign: "text-bottom" } }}
          >
            <MdCopyAll />
          </IconContext.Provider>
          {showModel ? (
            <div className="btn btn-outline btn-sm dropdown-content ml-1">
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

const styles = {
  hoverMessage: {
    top: "-25px", // Adjust this value as needed
    left: "50%",
    transform: "translateX(-50%)",
    z_index: "1",
    padding: "5px 10px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "3px",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
};
