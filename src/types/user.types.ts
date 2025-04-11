export interface formType {
  role: string;
  jobDesc: string;
  experience: string;
}

export interface UserDataType {
  userId: string;
  userName: string;
  jobDesc: string;
  role: string;
  experience: string;
  profilePic: string;
}

export interface ParseResultType {
  question: string;
  role: string;
  jobDesc: string;
  experience: string;
  isCompleted: boolean;
  answer: string;
  id: string;
  AIfeedback?: {
    rating: number;
    feedback: string;
  };
}

export interface PropesType {
  parseResult: ParseResultType[];
  userInfo: UserDataType;
}
