import { paths } from "@/common/paths";

const Statute = () => {
  return (
    <div className="text-justify">
      <p className="text-sm mb-1">
        Ogłoszenie dodwane jest na okres 90 dni. W sprawie edycji ogłoszenia,
        prosimy o kontakt na vettech.kontakt@gmail.com
      </p>
      <p className="text-xs text-opacity-20 mb-2">
        Dodając ogłoszenie akceptuję{" "}
        <a
          href={paths.regulamin}
          target="_blank"
          className="text-primary pointer"
        >
          &nbsp;regulamin&nbsp;
        </a>
        oraz wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę
        Kamil Szmytko VetTech zgodnie z Rozporządzeniem Parlamentu Europejskiego
        i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
        fizycznych w związku z przetwarzaniem danych osobowych i w sprawie
        swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
        (RODO).;
      </p>
    </div>
  );
};

export default Statute;
