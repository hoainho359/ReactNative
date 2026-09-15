export interface CustomError {
  message: string;
  statusCode?: number;
}

export function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  );
}

export async function fetchWrongApi(): Promise<void> {
  try {
    const response = await fetch("https://dummyjson.com/products/wrong-api");

    if (!response.ok) {
      const error: CustomError = {
        message: "Không thể gọi API",
        statusCode: response.status,
      };

      throw error;
    }
  } catch (error: unknown) {
    if (isCustomError(error)) {
      throw error;
    }

    throw {
      message: error instanceof Error ? error.message : "Lỗi không xác định",
      statusCode: 500,
    } as CustomError;
  }
}
