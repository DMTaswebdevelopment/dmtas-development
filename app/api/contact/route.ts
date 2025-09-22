import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

//nodeMailer
import nodemailer from "nodemailer";

//.dotENV
import { config } from "dotenv";
import ContactTemplateComponent from "@/app/components/template/ContactTemplateComponent/ContactTemplateComponent";
import {
  RequestData,
  UserDetails,
} from "@/app/model/interface/RequestDataType";

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

const resendBackup = async (data: RequestData): Promise<void> => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const userDetails: UserDetails = data.formValues;
  const emails: string[] = ["webdevelopment@dmtas.com.au"];

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emails, // This is where the email will be sent
    subject: "New message from DMTas website",
    react: ContactTemplateComponent({
      Name: userDetails.Name,
      Brand: data.parsedData.title,
      Company: userDetails.Company || "",
      Email: userDetails.Email,
      Phone: userDetails.Phone,
      Message: userDetails.Message || "",
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
  const department: string = data.parsedData.email;
  const emails: string[] = [`webdevelopment@dmtas.com.au`, `${department}`];

  try {
    const info = await transporter.sendMail({
      from: `'DMTas.com.au'<${process.env.NODEMAILER_EMAIL}>`,
      to: emails,
      subject: "New message from DMTas website",
      html: `
    <div>
      <p>
        ${userDetails.Name} just submitted the ${data.parsedData.title} contact form on the Document
        Management Tasmania Website.
      </p>

      <p>Message Details:</p>
      <p>Name: ${userDetails.Name}</p>
      <p>Email: ${userDetails.Email}</p>
      <p>Company: ${userDetails.Company}</p>
      <p>Phone: ${userDetails.Phone}</p>
      <p>Message: ${userDetails.Message}</p>
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
