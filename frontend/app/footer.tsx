import Feedback from "./feedback";
export interface FooterProps {}
export default function Footer() {
  return (
    <div className="flex flex-row w-full">
      <Feedback />
    </div>
  );
}
