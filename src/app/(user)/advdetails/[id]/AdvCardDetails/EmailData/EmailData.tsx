const detailStyle = "mb-2 font-light";

const EmailData = ({ mail, post }: { mail: string; post: string }) => {
  return (
    <div className="text-sm bg-blue text-center">
      <p className={detailStyle}>
        Samodzielnie wyślij swoje CV umieszczając ponisze dane w wiadomości:
      </p>
      <p className={detailStyle}>Adres, na który nalezy wysłać maila: {mail}</p>
      <p className={detailStyle}>
        Tytuł maila: [Twoje imię i nazwisko] Stanowisko: {post}
      </p>
    </div>
  );
};

export default EmailData;
