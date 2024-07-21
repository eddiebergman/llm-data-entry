import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        newChat: "New Chat",
        copied: "copied!",
        internal: "Internal",
        external: "External",
        addMessage: "Add message",
        couldNotCopy: "Could not copy!",
        failedToSync: "Failed to sync, please try again later!",
        internalHelpDialogue:
          "For use by an internal ChatBot for the University of Freiburg. Contains either private or sensitive information about internal processes that should not be known only to employess of the university.",
        externalHelpDialogue:
          "For use by an external ChatBot for the Unversity of Freiburg. Contains publicly accessible information available to anyone.",
        titlePlaceholder: "Enter a title for you chat...",
        chatUpdatedPleaseSync: "Chat was updated, click to sync",
        failedToRetrieveChats:
          "Failed to retrieve chats, please try again later!",
        placeholderHuman1: "Question...?",
        placeholderBot1: "What would you like to see a good AI-chatbot reply?",
        initialHelpMessage1:
          "The university of Freiburg would like to train an AI-chatbot to help answer questions about the university. This includes both publically accesible information but also information to help with internal processes. This web application is to help streamline that process. We'll help to walk you through this step-by-step!",
        helpUserkey:
          "This key is used to save your chats. If you lose this, you can not access previous chats.\nYou may share this with others to see the same chat history!",
        feedbackSuccessToast: "Thanks for your feedback!",
        feedbackFailToast:
          "Something went wrong trying to submit your feedback!",
        yourFeedback: "Your Feedback",
        feedbackForm: "Feedback Form",
        uploadImage: "Upload Image",
        cancel: "Cancel",
        submit: "Submit",
      },
    },
    de: {
      translation: {
        newChat: "Neuer Chat",
        copied: "(German) copied!",
        addMessage: "(German) Add message",
        internal: "(German) Internal",
        external: "(German) External",
        internalHelpDialogue:
          "(German) For use by an internal ChatBot for the University of Freiburg. Contains either private or sensitive information about internal processes that should not be known only to employess of the university.",
        externalHelpDialogue:
          "(German) For use by an external ChatBot for the Unversity of Freiburg. Contains publicly accessible information available to anyone.",
        couldNotCopy: "(German) Could not copy!",
        failedToSync: "(German) Failed to sync, please try again later!",
        titlePlaceholder: "(German) Enter a title for you chat...",
        chatUpdatedPleaseSync: "(German) Chat was updated, click to sync",
        failedToRetrieveChats:
          "(German) Failed to retrieve chats, please try again later!",
        placeholderHuman1: "(German) Question...?",
        placeholderBot1:
          "(German) What would you like to see a good AI-chatbot reply?",
        initialHelpMessage1:
          "(German) The university of Freiburg would like to train an AI-chatbot to help answer questions about the university. This includes both publically accesible information but also information to help with internal processes. This web application is to help streamline that process. We'll help to walk you through this step-by-step!",
        helpUserkey:
          "(German) This key is used to save your chats. If you lose this, you can not access previous chats.\nYou may share this with others to see the same chat history!",
        feedbackSuccessToast: "(German) Thanks for your feedback!",
        feedbackFailToast:
          "(German) Something went wrong trying to submit your feedback!",
        yourFeedback: "(German) Your Feedback",
        feedbackForm: "(German) Feedback Form",
        uploadImage: "(German) Upload Image",
        cancel: "(German) Cancel",
        submit: "(German) Submit",
      },
    },
  },
  lng: "de", // default language
  fallbackLng: "de", // fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
