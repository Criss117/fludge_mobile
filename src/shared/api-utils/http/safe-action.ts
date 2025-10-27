import { AxiosError, type AxiosResponse } from "axios";
import { CommonResponse } from "./common-response";

export async function safeAction<T>(
  action: () => Promise<AxiosResponse<CommonResponse<T>, unknown>>,
  messageError?: string
): Promise<CommonResponse<T>> {
  try {
    const res = await action();

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }

    // Incluye detalles del error original si existe
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    const finalMessage = messageError
      ? `${messageError}: ${errorMessage}`
      : errorMessage;

    return {
      message: finalMessage,
      statusCode: 500,
      error: errorMessage,
      data: null,
    };
  }
}
