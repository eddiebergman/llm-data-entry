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
          "The university of Freiburg would like to train an AI-chatbot to help answer questions about the university!\nIn order to do that, and make the chatbot as helpful as possible, the university needs to collect chat samples.\n\nThere will be two chatbots, one for Internal use and one for External usage.\n\nInternal chats can include sensitive information about internal processes or generally any information that should only be known to university employees, for example, university internal policy or questions about employee forms.\n\nExternal chats should only include information that is publically accessible to everyone. For example, student queries about replacing a student ID-card or how to enroll for exams.\n\nEnter a question below to get started! After hitting enter, you'll be asked to write what an ideal response from an AI-chatbot would look like.\n\nOnce you're done, you can submit your chat as being either internal or external, or add additional messages to make it a dialogue. You can always change or delete your chat at anytime!",
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
          "Die Universität Freiburg möchte einen KI-Chatbot trainieren, um das Beantworten von Fragen über die Universität zu erleichtern!\nUm dies zu ermöglichen und um den KI-Chatbot so hilfreich wie möglich zu gestalten, benötigt die Universität Chat-Beispiele.\n\nEs wird zwei Chatbots geben: einen für den internen und einen für den externen Gebrauch.\n\nInterne Chats können sensible Informationen über interne Prozesse beinhalten, oder allgemein Informationen, die nur Universitäts Mitarbeitenden zugänglich sein sollten, wie zum Beispiel interne Universitäts Regelwerke oder bestimmte Formulare.\n\nExterne Chats sollten nur Informationen enthalten, die öffentlich zugänglich sind, wie zum Beispiel Rückfragen von Studierenden zum Ersetzen verlorener Studierendenausweise oder zum Anmelden von Prüfungen.\n\nGeben Sie unten eine Frage ein, um zu starten! Nachdem Sie die Enter-Taste betätigt haben, werden Sie gefragt, was eine ideale Antwort eines KI-Chatbots Ihrer Meinung nach wäre.\n\nNachdem Sie fertig sind, können Sie Ihren Chat entweder als intern oder extern abschicken oder Sie fügen weitere Nachrichten hinzu, um einen Dialog zu erstellen. Sie können jederzeit Ihren Chat ändern oder löschen!",
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
