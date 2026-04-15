import React from "react";

export default function PageTitle({
  title,
  slot,
}: {
  title: string;
  slot?: React.ReactNode;
}) {
  return (
    <div className="page-title-container">
      <h1 className="page-title ">{title}</h1>
      {slot}
    </div>
  );
}
