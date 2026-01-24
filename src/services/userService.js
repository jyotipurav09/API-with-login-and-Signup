import {baseUrl} from "./baseurl";

export const login = (values) =>baseUrl.post("Auth/login",values);
export const signUp =   (values) =>baseUrl.post("User/register",values);