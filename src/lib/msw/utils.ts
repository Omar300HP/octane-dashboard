import { appConfig } from "@/config";
import { Order, Role, User } from "@/services/api";
import { padLeft } from "@/utils";

export const resolvePath = (path: string): string =>
  `${appConfig.baseUrl}${path}`;

export const getStore = <T>(storeName: string): Record<string, T> => {
  const storedData = localStorage.getItem(storeName) || null;
  return storedData ? JSON.parse(storedData) : {};
};

export const updateStorage = <T>(
  storeName: string,
  newStore: Record<string, T> = getStore(storeName)
) => {
  localStorage.setItem(storeName, JSON.stringify(newStore));
};

export const genRandomFullName = (): string => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "David"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Williams"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const genOrders = (limit: number, page: number): Order[] => {
  return new Array(limit).fill(null).map((_, index) => {
    const id = padLeft(page + index + 1);

    return {
      id,
      customerName: genRandomFullName(),
      date: new Date().toISOString(),
      status: "Pending",
      totalAmount: 100 * Math.random() * (index + page + 1),
    };
  });
};

export const genUsers = (limit: number, page: number): User[] => {
  return new Array(limit).fill(null).map((_, index) => {
    const id = padLeft(page + index + 1);

    const roles = ["Admin", "User", "Guest"];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    return {
      id,
      username: `user${id}`,
      email:
        genRandomFullName().replace(" ", "_").toLowerCase() +
        id +
        "@example.com",
      role: randomRole as Role,
      isActive: Math.random() > 0.5,
    };
  });
};
