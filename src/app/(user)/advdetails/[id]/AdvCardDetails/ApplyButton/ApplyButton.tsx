import { sendCV } from "./sendCV";

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
  const emailBody = `Szanowni Państwo, w odpowiedzi na ofertę pracy na protalu VetTechKariera przesyłam swoją aplikację na stanowisko ${post}, ID stanowiska: ${offerID}`;

  return (
    <button
      className="block w-80 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-3xl text-xl"
      onClick={sendCV}
    >
      Aplikuj wysyłając maila
    </button>
  );
};

export default ApplyButton;
