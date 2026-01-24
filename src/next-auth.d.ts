declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null; 
    role: string | null;
  }
}

export {};
