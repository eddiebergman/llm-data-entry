import { useTranslation } from "react-i18next";
import { TbSquareRoundedLetterI, TbSquareRoundedLetterE } from "react-icons/tb";

export function CardInternal({ submit }: { submit: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="card bg-base-100 w-full shadow-xl transition hover:scale-105">
      <div className="card-body">
        <h2 className="card-title">{t("internal")}</h2>
        <p>{t("internalHelpDialogue")}</p>
        <button
          className="btn btn-info btn-sm btn-outline"
          onClick={() => submit()}
        >
          <TbSquareRoundedLetterI className="text-lg" />
          {t("internal")}
        </button>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export function CardExternal({ submit }: { submit: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="card bg-base-100 w-full shadow-xl transition hover:scale-105">
      <div className="card-body">
        <h2 className="card-title">{t("external")}</h2>
        <p>{t("externalHelpDialogue")}</p>
        <button
          className="btn btn-info btn-sm btn-outline"
          onClick={() => submit()}
        >
          <TbSquareRoundedLetterI className="text-lg" />
          {t("external")}
        </button>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export default function SubmitCards({
  submit,
}: {
  submit: (where: "internal" | "external") => void;
}) {
  return (
    <div className="flex flex-row justify-center space-x-8">
      <CardInternal submit={() => submit("internal")} />
      <CardExternal submit={() => submit("external")} />
    </div>
  );
}
