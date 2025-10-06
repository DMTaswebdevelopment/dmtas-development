import { LoginResponseType } from "../model/interface/LoginResponseType";
import { RequestData, SignupData } from "../model/interface/RequestDataType";
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

// function to send email meter read (start) ============================================>
export const createVarietyPuzzleAccount = async (
  data: SignupData
): Promise<SendEmailResponseType> => {
  try {
    const response = await postFetch("/api/auth/variety/signup", data);
    return response;
  } catch {
    throw new Error("Error: Unable to send email");
  }
};
// function to send email meter read (end) ============================================>

// function to send email meter read (start) ============================================>
export const loginVarietyPuzzleAccount = (
  data: SignupData
): Promise<LoginResponseType> => {
  return new Promise((resolve, reject) => {
    postFetch("/api/auth/variety/login", data)
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        reject("Error: Something went wrong while logging in!");
      });
  });
};
// function to send email meter read (end) ============================================>
