import { RequestData } from "../model/interface/RequestDataType";
import { SendEmailResponseType } from "../model/types/SendEmailResponseType";
import { postFetch } from "./function";

export const sendEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/contact", data);
    return response as SendEmailResponseType;
  } catch (error) {
    throw new Error("Error: Unable to send email");
  }
};

export const sendServiceRequestEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/support/service_request", data);
    return response as SendEmailResponseType;
  } catch (error) {
    throw new Error("Error: Unable to send email");
  }
};

export const sendMeterReadEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/support/meter_read", data);
    return response as SendEmailResponseType;
  } catch (error) {
    throw new Error("Error: Unable to send email");
  }
};
