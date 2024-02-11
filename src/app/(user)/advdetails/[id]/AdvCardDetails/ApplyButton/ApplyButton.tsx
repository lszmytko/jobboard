const ApplyButton = ({ mail, post }: { mail: string; post: string }) => {
  const subject = `[Twoje imię i nazwisko] Stanowisko: ${post}`;
  const emailBody = `Szanowni Państwo, w odpowiedzi na ofertę pracy na protalu VetPraca przesyłam swoją aplikację na stanowisko: ${post}`;

  return (
    <button
      className="block w-80 bg-primary hover:bg-primary-dark text-white font-bold p-2 rounded-3xl text-lg"
      onClick={() => {
        window.open(
          `mailto:${mail}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(emailBody)}`
        );
      }}
    >
      Aplikuj wysyłając maila
    </button>
  );
};

export default ApplyButton;
