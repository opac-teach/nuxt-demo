export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const gr = (n = 12) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + n);
export const sr = () => gr(3).toUpperCase();

export const users: User[] = [
  {
    id: gr(),
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
    createdAt: new Date(),
  },
  {
    id: gr(),
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password",
    createdAt: new Date(),
  },
];

export interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  owner: string;
  description: string | null;
  logoUrl: string | null;
}

export const memecoins: Memecoin[] = [
  {
    id: gr(),
    name: "Memecoin 1",
    symbol: sr(),
    owner: users[0].id,
    description: "Memecoin 1 description",
    logoUrl: "https://picsum.photos/seed/memecoin1/50/50",
  },
  {
    id: gr(),
    name: "Memecoin 2",
    symbol: sr(),
    owner: users[0].id,
    description: "Memecoin 2 description",
    logoUrl: "https://picsum.photos/seed/memecoin2/50/50",
  },
  {
    id: gr(),
    name: "Memecoin 2",
    owner: users[1].id,
    symbol: sr(),
    description: "Memecoin 2 description",
    logoUrl: "https://picsum.photos/seed/memecoin3/50/50",
  },
];

// Don't do that ;)
export const SECRET_KEY = "your-secret-key-here";
export const CORRECT_PASSWORD = "admin123";
