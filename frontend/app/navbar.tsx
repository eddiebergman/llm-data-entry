import React, { MouseEventHandler } from "react";

interface MenuBarIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function MenuBarIcon({ onClick }: MenuBarIconProps) {
  return (
    <button onClick={onClick} className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  );
}

interface NavBarProps {
  onMenuBarClicked: MouseEventHandler<HTMLButtonElement>;
  onNewChatClicked: () => void;
}

export default function NavBar({
  onNewChatClicked,
  onMenuBarClicked,
}: NavBarProps) {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="mr-8">
          <MenuBarIcon onClick={onMenuBarClicked} />
        </div>
      </div>
      <div className="navbar-center">
        <button className="btn btn-success" onClick={() => onNewChatClicked()}>
          Make a new chat
        </button>
      </div>
      <div className="navbar-end">
        <button className="btn btn-outline btn-sm">Feedback</button>
      </div>
    </div>
  );
}
