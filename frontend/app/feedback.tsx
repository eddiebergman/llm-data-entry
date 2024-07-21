import React, { useContext, useState } from "react";
import { sendFeedbackEndpoint } from "./api";
import { StateContext } from "./state";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Feedback({ isOpen, onClose }: FeedbackModalProps) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [state, _] = useContext(StateContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    sendFeedbackEndpoint(state.userkey, feedback, image)
      .then(() => {
        toast.success(t("feedbackSuccessToast"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      })
      .catch(() => {
        toast.error(t("feedbackFailToast"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{t("feedbackForm")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("yourFeedback")}
            </label>
            <textarea
              id="feedback"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t("uploadImage")}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
