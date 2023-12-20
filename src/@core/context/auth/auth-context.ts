"use client";
import { createContext } from "react";


export const AuthContext = createContext<{
  isLogin:boolean
  login:VoidFunction,
  logout:VoidFunction
}>({
  isLogin:false,
  login: ()=>undefined,
  logout:  ()=>undefined,
});




