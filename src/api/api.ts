import axios from "axios";
import { ApiConfig } from "../config/api.config";

export default function api(path: string, method: "get" | "post" | "patch" | "delete", body: any | undefined){
    return new Promise((resovle, reject) => {
        axios({
            method: method,
            url: path,
            baseURL: ApiConfig.API_URL,
            data: JSON.stringify(body),
            headers: {
                "Content-type" : "appication/json",
                "Authorization": getToken()
            }
        }).then(res => responseHandelr(res,resovle, reject))
        .catch(err => reject(err));
    })
   
}

function getToken(){
    const token = localStorage.getItem("api_token");
    return token;
}

function saveToken(token: string): void{
    localStorage.setItem("api_token", token);
}

function responseHandelr(res: any,resovle: (value: unknown) => void, reject: (reason?: any) => void){
    if(res.status < 200 || res.status >= 300){
        return reject(res.data);
    }

    if(res.data.stautsCode < 0){
        return reject(res.data);
    }

    return res.data;
}