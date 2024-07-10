import axios, { AxiosResponse } from "axios";

async function sendHttpRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> {
    const response: AxiosResponse<T> = await axios({ url, method, data });
    return response.data;
  }

export default sendHttpRequest;