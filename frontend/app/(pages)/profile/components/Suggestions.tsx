"use client";

export default function Suggestions() {
  const handleMailClick = () => {
    const email = "mejiapaulo13@gmail.com";
    const subject = "Email for Tipon!";
    const body = "I have something to say about Tipon...";

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };
  return (
    <div className="flex justify-center text-nowrap text-small">
      <span>for bugs report and feature suggestion&nbsp;</span>
      <span
        className="underline text-primary cursor-pointer"
        onClick={handleMailClick}
      >
        send an email
      </span>
    </div>
  );
}
