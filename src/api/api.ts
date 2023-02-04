import axios from "axios";
import { resolve } from "path";
import { ApiConfig } from "../config/api.config";

export default function api(path: string, method: "get" | "post" | "patch" | "delete", body: any | undefined){
    return new Promise<ApiResponse>((resovle) => {
        const requestData = {
            method: method,
            url: path,
            baseURL: ApiConfig.API_URL,
            data: JSON.stringify(body),
            headers: {
                "Content-type" : "application/json",
                "Authorization": getToken()
            }
        }
        axios(requestData).then(res => responseHandelr(res,resovle,requestData))
        .catch(err => {
            const response : ApiResponse = {
                status: "error",
                data: err
            }
            
            resovle(response);
        });
    })
   
}

export interface ApiResponse {
    status: "ok" | "error" | "login",
    data: any;
}

function getToken(){
    const token = localStorage.getItem("api_token");
    return token;
}

export function saveToken(token: string): void{
    localStorage.setItem("api_token", token);
}

export function getRefreshToken(): string | null{
    const token = localStorage.getItem("api_reresh_token");
    return token;
}

export function saveRefreshToken(token: string){
    localStorage.setItem("api_reresh_token", token);
}

async function responseHandelr(res: any,resolve: (value: ApiResponse) => void, requestData: { method: "get" | "post" | "patch" | "delete"; url: string; baseURL: string; data: string; headers: { "Content-type": string; Authorization: string | null; }; }){
    console.log(res);
    if(res.status < 200 || res.status >= 300){
        const response: ApiResponse = {
            status: "error",
            data: res.data
        }

        if(res.status === 401){
           const newToken = await refreshToken(requestData);

           if(!newToken){
            const response: ApiResponse = {
                status: "login",
                data: null
            }
            return resolve(response);
           }

           saveToken(newToken);

           requestData.headers["Authorization"] = getToken(); 

           return await repeatRequest(requestData, resolve);
        }


        return resolve(response);
    }

    if(res.data.stautsCode < 0){
        const response: ApiResponse = {
            status: "login",
            data: null
        }
        return resolve(response);
    }else{
        const response : ApiResponse ={
            status: "ok",
            data: res.data
        }
        return resolve(response);
    }

    //return res.data;
}

async function refreshToken(requestData: { method: "get" | "post" | "patch" | "delete"; url: string; baseURL: string; data: string; headers: { "Content-type": string; Authorization: string | null; }; }){
    const path = "user/refresh";
    const data: any | null = {
        	token : getRefreshToken(),

    }

    const requesRefreshTokentData = {
        method: "post",
        url: path,
        baseURL: ApiConfig.API_URL,
        data: JSON.stringify(data),
        headers: {
            "Content-type" : "appication/json",
        }
    }

    const refreshTokenResponse = await axios(requesRefreshTokentData);

    if(!refreshTokenResponse.data.token){
        return null;
    }

    return refreshTokenResponse.data.token;
}

async function repeatRequest(requestData: { method: "get" | "post" | "patch" | "delete"; url: string; baseURL: string; data: string; headers: { "Content-type": string; Authorization: string | null; }; }, resolve: (value: ApiResponse) => void){
    axios(requestData)
        .then(res => {
            if(res.status === 401){
                const response: ApiResponse = {
                    status: "login",
                    data: null
                }
                return resolve(response);
               }
            
            const response: ApiResponse = {
                status: "ok",
                data: null
            }

            return resolve(response.data);
        })
        .catch(err  =>{
            const response: ApiResponse = {
                status: "error",
                data: err
            }

            return resolve(response);
        })
}