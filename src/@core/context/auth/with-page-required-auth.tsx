"use client";
import useAuth from "./use-auth";
import React, { FunctionComponent, useEffect } from "react";
import {useRouter} from "next/router";



type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};



function withPageRequiredAuth(
  Component: FunctionComponent<PropsType>,
) {

  return function WithPageRequiredAuth(props: PropsType) {
    const { isLogin } = useAuth();
    const router = useRouter()


    useEffect(()=>{
      if (!isLogin){
        router.push('/login')
      }
    },[isLogin, router])



    return isLogin ? (
      <Component {...props} />
    ) : null;
  };
}

export default withPageRequiredAuth;
