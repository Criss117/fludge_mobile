import axios, { type AxiosResponse } from "axios";
import { CommonResponse } from "./http/common-response";

export function initApi(baseURL: string) {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export class API {
  private api: ReturnType<typeof initApi>;
  private authInterceptorId: number | null = null;

  constructor(baseURL: string) {
    const api = initApi(baseURL);

    this.api = api;
  }

  get axios() {
    return this.api;
  }

  public applyAuthInterceptor(token: string) {
    if (this.authInterceptorId !== null) {
      this.api.interceptors.request.eject(this.authInterceptorId);
    }

    this.authInterceptorId = this.api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, string | number | undefined>
  ) {
    const response = await this.api.get<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>
    >(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });

    return response;
  }

  public async post<T, D = undefined>(endpoint: string, data?: D) {
    const response = await this.api.post<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  public async postML<T>(endpoint: string, data: FormData) {
    const response = await this.api.post<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>,
      FormData
    >(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }

  public async put<T, D>(endpoint: string, data: D) {
    const response = await this.api.put<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  public async delete<T, D = undefined>(endpoint: string, data?: D) {
    const response = await this.api.delete<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response;
  }

  public async patch<T, D>(endpoint: string, data: D) {
    const response = await this.api.patch<
      CommonResponse<T>,
      AxiosResponse<CommonResponse<T>, unknown>,
      D
    >(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}
