import { useEffect } from "react";

export const accessToken = () => {
  const Token =
    localStorage.getItem("access") !== "undefined"
      ? JSON.parse(localStorage.getItem("access"))
      : localStorage.clear();
  return Token;
};
export const userInfo = () => {
  const userToken = 
  localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
    
  return userToken;

};

