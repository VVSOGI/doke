export interface HeaderCredential {
  key: string;
  type: "Bearer" | "Basic" | "custom";
  value: string;
}
