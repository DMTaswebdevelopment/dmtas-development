import React from "react";

interface ContactTemplateProps {
  Name: string;
  Brand: string;
  Company: string;
  Email: string;
  Phone: string;
  Message: string;
}

const ContactTemplateComponent: React.FC<ContactTemplateProps> = ({
  Name,
  Brand,
  Company,
  Email,
  Phone,
  Message,
}) => {
  return (
    <div>
      <p>
        {Name} just submitted the {Brand} contact form on the Document
        Management Tasmania Website.
      </p>

      <p>Message Details:</p>
      <p>Name: {Name}</p>
      <p>Email: {Email}</p>
      <p>Company: {Company}</p>
      <p>Phone: {Phone}</p>
      <p>Message: {Message}</p>
    </div>
  );
};

export default ContactTemplateComponent;
