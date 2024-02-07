const ApplyButton = ({
  mail,
  post,
  offerID,
}: {
  mail: string;
  post: string;
  offerID: string;
}) => {
  const subject = `[Twoje imię i nazwisko] Stanowisko: ${post} ID stanowiska: ${offerID}`;
  const emailBody = `Szanowni Państwo, w odpowiedzi na ofertę pracy na protalu VetPraca przesyłam swoją aplikację na stanowisko ${post}, ID stanowiska: ${offerID}`;

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
