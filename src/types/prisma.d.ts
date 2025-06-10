import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line no-var
}

export {};
