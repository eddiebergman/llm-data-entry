import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
} from "react";
import {USER_ICON} from "./usernamePasswordInput"

interface MenuBarIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function UserProfileIcon({ onClick }: MenuBarIconProps) {
  return (
    <button onClick={onClick} className="btn btn-square btn-ghost">
      {USER_ICON}
    </button>
  );
}

interface NewChatIconProprs {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
// TODO: Make this look nicer
export function NewChatButton({ onClick }: MenuBarIconProps) {
  return (
    <button onClick={onClick} className="join-item btn btn-sm btn-outline btn-success">
      +
    </button>
  );
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

export const ClearButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function ClearButton({ ...buttonProps }, ref) {
  return (
    <button ref={ref} {...buttonProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
});

interface ToggleProps {
  onClick: MouseEventHandler<HTMLLabelElement>;
}

export function Toggle({ onClick }: ToggleProps) {
  return (
    <label
      onClick={onClick}
      className="flex content-center cursor-pointer gap-2"
    >
      <span className="label-text">Chat</span>
      <input
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <span className="label-text">Q&A</span>
    </label>
  );
}

interface NavBarProps {
  onSubmitExternalClicked: MouseEventHandler<HTMLButtonElement>;
  onSubmitInternalClicked: MouseEventHandler<HTMLButtonElement>;
  onClearClicked: MouseEventHandler<HTMLButtonElement>;
  onMenuBarClicked: MouseEventHandler<HTMLButtonElement>;
  onUserProfileClicked: MouseEventHandler<HTMLButtonElement>;
  onNewChatClicked: MouseEventHandler<HTMLButtonElement>
}

export default function NavBar({
  onSubmitExternalClicked,
  onSubmitInternalClicked,
  onClearClicked,
  onUserProfileClicked,
  onMenuBarClicked,
  onNewChatClicked,
}: NavBarProps) {
  const submitExternal = (
    <button
      className="join-item btn btn-sm btn-outline btn-success"
      onClick={onSubmitExternalClicked}
    >
      Submit External
    </button>
  );

  const submitInternal = (
    <button
      className="join-item btn btn-sm btn-outline btn-warning"
      onClick={onSubmitInternalClicked}
    >
      Submit Internal
    </button>
  );

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="mr-8">
          <MenuBarIcon onClick={onMenuBarClicked} />
        </div>
      </div>
      <div className="navbar-center">
        <div className="flex space-x-4">
          <NewChatButton 
            onClick={onNewChatClicked}
          />
          <div className="join">
            {submitInternal}
            {submitExternal}
          </div>
          <ClearButton
            onClick={onClearClicked}
            className="join-item btn btn-square btn-sm btn-outline btn-error"
          />
        </div>
      </div>
      <div className="navbar-end">
        <div className="mr-8">
          <UserProfileIcon onClick={onUserProfileClicked} />
        </div>
      </div>
    </div>
  );
}
