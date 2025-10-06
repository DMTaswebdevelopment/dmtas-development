export interface UserDetails {
  Name: string;
  Email: string;
  Company?: string;
  Phone: string;
  Message?: string;
  Brand?: string;
  BusinessName?: string;
  MachineId?: string;
  ErrorCode?: string;
  IDSN?: string;
  Meter1?: string;
  Meter2?: string;
  Meter3?: string;
  Meter4?: string;
  Meter5?: string;
}

export interface ParsedData {
  email: string;
  title: string;
}

export interface RequestData {
  formValues: UserDetails;
  parsedData: ParsedData;
}

export interface SignupData {
  login_id: string;
  password: string;
}
