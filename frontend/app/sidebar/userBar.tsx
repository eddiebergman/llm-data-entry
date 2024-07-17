import { IconContext } from "react-icons";
import { MdCopyAll } from "react-icons/md";

export interface UserbarHandlers {
  onKeyChange: (value: string) => void;
  onRefreshClicked: () => void;
}
interface UserbarProps {
  userKey: string;
  handlers: UserbarHandlers;
}
export default function UserBar({ userKey, handlers }: UserbarProps) {
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
        <IconContext.Provider
          value={{ style: { verticalAlign: "text-bottom" } }}
        >
          <MdCopyAll />
        </IconContext.Provider>
      </div>
    </div>
  );
}
