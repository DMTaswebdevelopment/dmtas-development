import { RequestData } from "../model/interface/RequestDataType";
import { SendEmailResponseType } from "../model/types/SendEmailResponseType";
import { postFetch } from "./function";

// function to send email inquiry section (start) ============================================>
export const sendEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/contact", data);
    return response as SendEmailResponseType;
  } catch {
    throw new Error("Error: Unable to send email");
  }
};
// function to send email inquiry section (end) ============================================>

// function to send email service request (start) ============================================>
export const sendServiceRequestEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/support/service_request", data);
    return response as SendEmailResponseType;
  } catch {
    throw new Error("Error: Unable to send email");
  }
};
// function to send email service request (end) ============================================>

// function to send email meter read (start) ============================================>
export const sendMeterReadEmail = async (
  data: RequestData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/support/meter_read", data);
    return response as SendEmailResponseType;
  } catch {
    throw new Error("Error: Unable to send email");
  }
};
// function to send email meter read (end) ============================================>
