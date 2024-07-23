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
        close: "Close",
        submit: "Submit",
        "privacy-policy": "Privacy Policy",
        policy:
          "Data protection declaration for data collection at the University of Freiburg\n\n1. Introduction\n\nWe, the University of Freiburg, take the protection of your personal data very seriously. This privacy policy informs you about how we collect, store and use your data, particularly in connection with the fine-tuning of language models. Please read this statement carefully.\n\n2. Responsible body\n\nAlbert-Ludwigs-Universität Freiburg\nDer Datenschutzbeauftragte\nFahnenbergplatz\n79085 Freiburg\ndatenschutzbeauftragter@uni-freiburg.de\n\n3. Collection and processing of data\n\nAs part of our activities, we collect data that is used to fine-tune language models. This data includes, but is not limited to:\n- Text data from various sources\n- Metadata such as date and time of data collection\n- Information about the sources of the data\n4. Purpose of data collection\n\nThe data collected is used exclusively to improve the performance and accuracy of language models. Data processing is carried out on the basis of your consent or, if necessary, to carry out a task that is in the public interest or in the exercise of official authority.\n\n5. Storage of data\n\nYour data is stored in secure databases and is only accessible to a limited group of people who are necessary to carry out the work.\n\n6. Deletion of data\nYou have the right to request the deletion of your personal data at any time. Please note, however, that deleting your data has no impact on language models that have already been optimized, as these models are based on aggregated data sets. A subsequent adjustment of the models is not possible.\n\n7. Your rights\nYou have the right:\n- Request deletion of your data.\n- To lodge a complaint with a supervisory authority if you believe that the processing of your data violates data protection laws.\n\n8. Changes to the privacy policy\n\nWe reserve the right to change this data protection declaration at any time in order to adapt it to changes in the legal situation or in the event of changes to the service or data processing. You can find the current version at any time on our website.\n\n9. Contact\nIf you have any questions about data protection or exercising your rights, you can contact our data protection officer:\n\nAlbert-Ludwigs-Universität Freiburg\nDer Datenschutzbeauftragte\nFahnenbergplatz\n79085 Freiburg\ndatenschutzbeauftragter@uni-freiburg.de\n\n10. Consent\n\nBy using our services and providing your data, you agree to this privacy policy.\n\nAlbert-Ludwigs-Universität Freiburg\nJuly 23, 2024",
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
        close: "schließen",
        cancel: "stornieren",
        submit: "einreichen",
        feedback: "Rückmeldung",
        "privacy-policy": "Datenschutzerklärung",
        policy:
          "Datenschutzerklärung für die Datenerhebung an der Universität Freiburg\n\n1. Einführung\n\nWir, die Universität Freiburg, nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir Ihre Daten sammeln, speichern und verwenden, insbesondere im Zusammenhang mit dem Finetuning von Sprachmodellen. Bitte lesen Sie diese Erklärung sorgfältig durch.\n\n2. Verantwortliche Stelle\n\nVerantwortliche Stelle für die Datenverarbeitung ist:\nAlbert-Ludwigs-Universität Freiburg\nDer Datenschutzbeauftragte\nFahnenbergplatz\n79085 Freiburg\ndatenschutzbeauftragter@uni-freiburg.de\n\n3. Erhebung und Verarbeitung von Daten\n\nIm Rahmen unserer Aktivitäten sammeln wir Daten, die für das Finetuning von Sprachmodellen genutzt werden. Diese Daten umfassen, aber sind nicht beschränkt auf:\n- Textdaten aus verschiedenen Quellen\n- Metadaten wie Datum und Uhrzeit der Datenerhebung\n- Angaben zu den Quellen der Daten\n\n4. Zweck der Datenerhebung\n\nDie gesammelten Daten werden ausschließlich verwendet, um die Leistung und Genauigkeit von Sprachmodellen zu verbessern. Die Datenverarbeitung erfolgt auf der Grundlage Ihrer Einwilligung oder, soweit erforderlich, zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt.\n\n5. Speicherung der Daten\n\nIhre Daten werden in sicheren Datenbanken gespeichert und sind nur einem eingeschränkten Personenkreis zugänglich, der für die Durchführung der Arbeiten notwendig ist.\n\n6. Löschung der Daten\n\nSie haben das Recht, jederzeit die Löschung Ihrer personenbezogenen Daten zu löschen. Bitte beachten Sie jedoch, dass die Löschung Ihrer Daten keinen Einfluss auf bereits optimierte Sprachmodelle hat, da diese Modelle auf aggregierten Datensätzen basieren. Eine nachträgliche Anpassung der Modelle ist nicht möglich.\n\n7. Ihre Rechte\n\nSie haben das Recht:\n- Die Löschung Ihrer Daten zu verlangen.\n- Eine Beschwerde bei einer Aufsichtsbehörde einzureichen, wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen Datenschutzgesetze verstößt.\n\n8. Änderungen der Datenschutzerklärung\n\nWir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern, um sie an geänderte Rechtslagen oder bei Änderungen des Dienstes oder der Datenverarbeitung anzupassen. Die aktuelle Fassung finden Sie jederzeit auf unserer Website.\n\n9. Kontakt\n\nFür Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie sich an unseren Datenschutzbeauftragten wenden:\n\nAlbert-Ludwigs-Universität Freiburg\nDer Datenschutzbeauftragte\nFahnenbergplatz\n79085 Freiburg\ndatenschutzbeauftragter@uni-freiburg.de\n\n10. Einwilligung\n\nMit der Nutzung unserer Dienste und der Bereitstellung Ihrer Daten erklären Sie sich mit dieser Datenschutzerklärung einverstanden.\n\nAlbert-Ludwigs-Universität Freiburg\n23.07.2024",
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
