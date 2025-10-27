import { HttpStatus } from "./http-status";

export interface CommonResponse<T> {
  message: string;
  statusCode: HttpStatus;
  error?: string;
  data: T | null;
}
