import {api} from "./axios";
import {
  AuthConfirmEmailRequest, AuthConfirmEmailResponse,
  AuthGoogleLoginRequest,
  AuthGoogleLoginResponse,
  AuthLoginRequest,
  AuthLoginResponse, AuthPatchMeRequest, AuthPatchMeResponse,
  AuthSignUpRequest, AuthSignUpResponse, LogoutRequest
} from "../types/auth";
import {AUTH_LOGOUT_URL, AUTH_ME_URL} from "./config";


export enum AuthType {
  GOOGLE="google",
  EMAIL="email",
}






class AuthService{

  private url = (authType:AuthType)=>`/v1/auth/${authType}/login`



  async emailAuth(data: AuthLoginRequest){


    const url = this.url(AuthType.EMAIL)

return api.post<AuthLoginResponse>(`${url}`, data)
  }


  async googleAuth(data: AuthGoogleLoginRequest){
    const google = this.url(AuthType.EMAIL)

return api.post<AuthGoogleLoginResponse>(google, data).then(res=>res.data)
  }



  async emailRegister(data: AuthSignUpRequest){
    return api.post<AuthSignUpResponse>('/v1/auth/email/register', data)
  }

  async confirmEmail(data: AuthConfirmEmailRequest){


    return api.post<AuthConfirmEmailResponse>('/v1/auth/email/confirm',data)
  }


  async authMe(data:AuthPatchMeRequest){
    return api.patch<AuthPatchMeResponse>('/v1/auth/me', data)
  }


  async logOut(data:LogoutRequest){
    return api.post(AUTH_LOGOUT_URL, data)
  }


  async authMeProvider(data:any){
    return api.get(AUTH_ME_URL, data)
  }


  async login(){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve('ok')
      },1500)
    })
  }
  async logout(){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve('ok')
      },1500)
    })
  }


}



export const authService = new AuthService()
