import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

//nodeMailer
import nodemailer from "nodemailer";

//.dotENV
import { config } from "dotenv";
import {
  RequestData,
  UserDetails,
} from "@/app/model/interface/RequestDataType";
import ServiceRequestTemplateComponent from "@/app/components/template/ServiceRequestTemplateComponent/ServiceRequestTemplateComponent";
import MeterRead from "@/app/components/template/MeterReadComponent/MeterReadComponent";

config();
// Type definitions

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const resendBackup = async (data: RequestData): Promise<void> => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const userDetails: UserDetails = data.formValues;
  const emails: string[] = ["webdevelopment@dmtas.com.au"];

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emails, // This is where the email will be sent
    subject: "New message from DMTas website",
    react: MeterRead({
      Name: userDetails.Name,
      Email: userDetails.Email,
      Phone: userDetails.Phone,
      IDSN: userDetails.IDSN || "",
      Meter1: userDetails.Meter1 || "",
      Meter2: userDetails.Meter2 || "",
      Meter3: userDetails.Meter3 || "",
      Meter4: userDetails.Meter4 || "",
      Meter5: userDetails.Meter5 || "",
    }) as React.ReactElement,
  });

  if (error) {
    console.log(error);
    return;
  }

  return;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data: RequestData = await request.json();
  const userDetails: UserDetails = data.formValues;
  const emails: string[] = [
    `webdevelopment@dmtas.com.au`,
    //  "billing@dmtas.com.au",
    // "support@fxtasmania.com.au",
    // "support@dmtas.com.au",
    // "janmaakurubio14@gmail.com",
  ];

  try {
    const info = await transporter.sendMail({
      from: `'DMTas.com.au'<${process.env.NODEMAILER_EMAIL}>`,
      to: emails,
      subject: "New message from DMTas website",
      html: `
     <div>
      <p>
        ${userDetails.Name} just submitted the Meter Read form on the Document Management
        Tasmania website.
      </p>
      <p>Message Details:</p>
      <p>Name: ${userDetails.Name}</p>
      <p>Email: ${userDetails.Email}</p>
      <p>Phone: ${userDetails.Phone}</p>
      <p>IDSN: ${userDetails.IDSN}</p>
      <p>Meter 1: ${userDetails.Meter1}</p>
      <p>Meter 2: ${userDetails.Meter2}</p>
      <p>Meter 3: ${userDetails.Meter3}</p>
      <p>Meter 4: ${userDetails.Meter4}</p>
      <p>Meter 5: ${userDetails.Meter5}</p>
    </div>`,
    });

    if (info.accepted.length === 0) {
      await resendBackup(data);
      return NextResponse.json({ message: "Email not sent", statusCode: 500 });
    }

    await resendBackup(data);
    return NextResponse.json({
      message: "Email sent successfully",
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    await resendBackup(data);
    return NextResponse.json({ message: "Email not sent" });
  }
}
