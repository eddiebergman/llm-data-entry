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
          "Internal chats can include sensitive information about internal processes or any information that should only be known to university employees.",
        externalHelpDialogue:
          "External chats should only include information that is publically accessible to everyone.",
        titlePlaceholder: "Enter a title for you chat...",
        chatUpdatedPleaseSync: "Chat was updated, click to sync",
        failedToRetrieveChats:
          "Failed to retrieve chats, please try again later!",
        placeholderHuman1: "Question...?",
        placeholderBot1: "What would you be a good AI-ChatBot reply?",
        initialHelpMessage1:
          "The University of Freiburg would like to train an AI chatbot to make it easier to answer questions about the university! To make this possible and to make the AI chatbot as helpful as possible, the university needs chat examples.\n\nThere will be two chatbots: one for internal use and one for external use. The internal chatbot will be optimized for data from the intranet that should only be accessible to university employees, such as internal university regulations or certain forms from the A-Z. External chats should only concern information that is publicly available, e.g. questions from potential students or press representatives.\n\nEnter a question below to get started! After you hit the enter key, you will be asked what you think an ideal answer would be from an AI chatbot. After you're done, you can submit your chat as either internal or external, or add more messages to create a dialog. You can change or delete your chat at any time.",
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
        copied: "kopiert!",
        addMessage: "Nachricht hinzufügen",
        internal: "Intern",
        external: "Extern",
        internalHelpDialogue:
          "Interne Chats können sensible Informationen über interne Prozesse beinhalten.",
        externalHelpDialogue:
          "Externe Chats sollten nur Informationen enthalten, die öffentlich zugänglich sind.",
        couldNotCopy: "konnte nicht kopiert werden!",
        failedToSync:
          "Die Synchronisierung ist fehlgeschlagen. Bitte versuchen Sie es später noch einmal!",
        titlePlaceholder: "Geben Sie einen Titel ein...",
        chatUpdatedPleaseSync:
          "Der Chat wurde aktualisiert. Zum Synchronisieren klicken",
        failedToRetrieveChats:
          "Chats konnten nicht abgerufen werden. Bitte versuchen Sie es später noch einmal!",
        placeholderHuman1: "Frage...?",
        placeholderBot1: "Was wäre eine gute KI-Chatbot Antwort?",
        initialHelpMessage1:
          "Die Universität Freiburg möchte einen KI-Chatbot trainieren, um das Beantworten von Fragen über die Universität zu erleichtern! Um dies zu ermöglichen und um den KI-Chatbot so hilfreich wie möglich zu gestalten, benötigt die Universität Chat-Beispiele.\n\nEs wird zwei Chatbots geben: einen für den internen und einen für den externen Gebrauch. Der interne Chatbot wird auf Daten aus dem Intranet optimiert werden, die nur Mitarbeitenden der Universität zugänglich sein sollten, wie z.B. interne Regelwerke der Universität oder bestimmte Formulare aus dem A-Z. Externe Chats sollten nur Informationen betreffen, die öffentlich zugänglich sind, z.B. zu Fragen von potentiellen Studierenden oder Pressevertretern.\n\nGeben Sie unten eine Frage ein, um zu starten! Nachdem Sie die Enter-Taste betätigt haben, werden Sie gefragt, was Ihrer Meinung nach eine ideale Antwort eines KI-Chatbots wäre. Nachdem Sie fertig sind, können Sie Ihren Chat entweder als intern oder extern abschicken, oder Sie fügen weitere Nachrichten hinzu, um einen Dialog zu erstellen. Sie können Ihren Chat jederzeit ändern oder löschen.",
        helpUserkey:
          "Mit dieser Taste können Sie Ihre Chats speichern. Wenn Sie dies verlieren, können Sie nicht auf frühere Chats zugreifen.\nSie können dies mit anderen teilen, um denselben Chat-Verlauf anzuzeigen!",
        feedbackSuccessToast: "Vielen Dank für Ihr Feedback!",
        feedbackFailToast:
          "Beim Versuch, Ihr Feedback einzureichen, ist ein Fehler aufgetreten!",
        yourFeedback: "Ihre Rückmeldung",
        feedbackForm: "Feedback-Formular",
        uploadImage: "Bild hochladen",
        cancel: "stornieren",
        submit: "einreichen",
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
