export interface JwtPayload {
  id: string;
  email: string;
  role: "customer" | "admin";
}