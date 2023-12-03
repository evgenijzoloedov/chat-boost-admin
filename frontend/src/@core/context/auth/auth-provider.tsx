"use client";



import {
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import {
  AuthContext,
} from "./auth-context";





import {authService} from "../../api/auth";

export function AuthProvider(props: PropsWithChildren<{}>) {


  const [isLogin, setIsLogin] = useState(false)

  const login = async ()=>{

   await authService.login()


    setIsLogin(true)
  }

  const logout = async ()=>{
    await authService.logout()

    setIsLogin(false)
  }

  const contextActionsValue = useMemo(
    () => ({
      isLogin,
      login,
      logout,
    }),
    [logout, login, isLogin]
  );



  return (
    <AuthContext.Provider value={contextActionsValue}>
          {props.children}
    </AuthContext.Provider>
  );
}

