export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type Tokens = {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  tokenExpires: number | null | undefined;
};


export enum UserProviderEnum {
  EMAIL = "email",
  GOOGLE = "google",
}

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  provider?: UserProviderEnum;
  socialId?: string;
};

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = Tokens & {
  user: User;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};


export type AuthSignUpRequest = {
  email: string;
  password: string;
};


export type AuthSignUpResponse = void;


export type AuthConfirmEmailRequest = {
  hash: string;
};


export type AuthConfirmEmailResponse = void;


export type AuthPatchMeRequest =
  | Partial<Pick<User, "firstName" | "lastName">>
  | { password: string; oldPassword: string };

export type AuthPatchMeResponse = User;


export type LogoutRequest = Tokens



enum HTTP_CODES_ENUM {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export default HTTP_CODES_ENUM;
