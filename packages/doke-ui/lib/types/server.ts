export type HttpMethods = "POST" | "GET" | "HEAD" | "OPTIONS" | "PUT" | "DELETE" | "PATCH";

export interface POSTRequestDefault {
  serverUrl: string;
  method: HttpMethods;
  headers: Record<string, string>;
  query: string;
  params: string;
  body: Record<string, string> | undefined;
}
