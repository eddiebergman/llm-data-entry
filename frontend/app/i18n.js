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
        placeholderBot1: "What would you like to see a good AI-ChatBot reply?",
        initialHelpMessage1:
          "The university of Freiburg would like to train an AI-ChatBot to help answer questions about the university! To do this, the university requires chat samples to make the AI-ChatBot as helpful as possible. There will be two chatbots, one for Internal use and one for External usage.\n\n Internal chats can include sensitive information about internal processes or generally any information that should only be known to university employees, for example, student enrollment processes, university internal policy or questions about employee forms.\n\n External chats include any information that is publically accessible and may be hard to find information on our websites, for example, replacing lost student cards, enrolling for exams or asking for offices responsible for specific queries.\n\n Enter a question below to get started! After hitting enter, you'll be asked for what an ideal response from an AI-Chatbot would look like. Once you're done, you can either extend that chat or be prompted which kind of chat it is! You can always, change this later or delete the chat if you like.",
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
          "(German) What would you like to see a good AI-ChatBot reply?",
        initialHelpMessage1:
          "(German) The university of Freiburg would like to train an AI-ChatBot to help answer questions about the university! To do this, the university requires chat samples to make the AI-ChatBot as helpful as possible. There will be two chatbots, one for Internal use and one for External usage.\n\n Internal chats can include sensitive information about internal processes or generally any information that should only be known to university employees, for example, student enrollment processes, university internal policy or questions about employee forms.\n\n External chats include any information that is publically accessible and may be hard to find information on our websites, for example, replacing lost student cards, enrolling for exams or asking for offices responsible for specific queries.\n\n Enter a question below to get started! After hitting enter, you'll be asked for what an ideal response from an AI-Chatbot would look like. Once you're done, you can either extend that chat or be prompted which kind of chat it is! You can always, change this later or delete the chat if you like.",
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
