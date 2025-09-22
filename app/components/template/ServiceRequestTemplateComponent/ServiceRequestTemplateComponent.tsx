import { ServiceRequestTemplateProps } from "@/app/model/interface/ServiceRequestTemplateType";
import React from "react";

const ServiceRequestTemplateComponent: React.FC<
  ServiceRequestTemplateProps
> = ({ Name, BusinessName, Email, Phone, MachineId, ErrorCode, Message }) => {
  return (
    <div>
      <p>
        {Name} just submitted the Service Request form on the Document
        Management Tasmania website.
      </p>

      <p>Message Details:</p>
      <p>Name: {Name}</p>
      <p>Business Name: {BusinessName}</p>
      <p>Email: {Email}</p>
      <p>Phone: {Phone}</p>
      <p>Machine ID: {MachineId}</p>
      <p>Error Code: {ErrorCode}</p>
      <p>Further Details: {Message}</p>
    </div>
  );
};

export default ServiceRequestTemplateComponent;
