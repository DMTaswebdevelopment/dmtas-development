import React from "react";

interface MeterReadProps {
  Name: string;
  Email: string;
  Phone: string;
  IDSN: string;
  Meter1: string;
  Meter2: string;
  Meter3: string;
  Meter4: string;
  Meter5: string;
}

const MeterRead: React.FC<MeterReadProps> = ({
  Name,
  Phone,
  Email,
  IDSN,
  Meter1,
  Meter2,
  Meter3,
  Meter4,
  Meter5,
}) => {
  return (
    <div>
      <p>
        {Name} just submitted the Meter Read form on the Document Management
        Tasmania website.
      </p>
      <p>Message Details:</p>
      <p>Name: {Name}</p>
      <p>Email: {Email}</p>
      <p>Phone: {Phone}</p>
      <p>IDSN: {IDSN}</p>
      <p>Meter 1: {Meter1}</p>
      <p>Meter 2: {Meter2}</p>
      <p>Meter 3: {Meter3}</p>
      <p>Meter 4: {Meter4}</p>
      <p>Meter 5: {Meter5}</p>
    </div>
  );
};

export default MeterRead;
