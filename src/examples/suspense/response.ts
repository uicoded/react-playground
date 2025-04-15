/**
 * Interface for successful response data
 */
interface ResponseData {
  data: string;
}

/**
 * Interface for error response data
 */
interface ErrorResponseData {
  status: string;
  code: number;
  message: string;
}

/**
 * Response utility that returns different mock responses based on the provided type
 * @param type - The type of response to return: 'earth', 'mars', or 'error'
 * @returns A promise that resolves to a Response object
 */
const getResponse = (type: 'earth' | 'mars' | 'error' = 'earth'): Promise<Response> => {
  switch (type) {
    case 'mars':
      return new Promise<Response>((resolve) =>
        setTimeout(() => {
          const data: ResponseData = { data: "Hello, Mars! 🔴" };
          resolve(new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }, 1500)
      );
    case 'error':
      return new Promise<Response>((_, reject) =>
        setTimeout(() => {
          const errorData: ErrorResponseData = {
            status: "error",
            code: 408,
            message: "Request Timeout"
          };
          reject(new Response(JSON.stringify(errorData), {
            status: 408,
            headers: { 'Content-Type': 'application/json' }
          }));
        }, 1000)
      );
    case 'earth':
    default:
      return new Promise<Response>((resolve) =>
        setTimeout(() => {
          const data: ResponseData = { data: "Hello, Earth! 🌍" };
          resolve(new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }, 1000)
      );
  }
};

export { getResponse };
export type { ResponseData, ErrorResponseData };

// Simplest fetch example:
// const response = await fetch('https://api.example.com/data')
// const data = await response.json();

/**
 * In a typical React application, the Response type should be available without any additional definitions
 * Here would be a lightweight definition of the Response type

  interface Response {
    json(): Promise<any>;
    text(): Promise<string>;
    status: number;
    ok: boolean;
    headers: Headers;
    // other properties as needed
  }
*/
