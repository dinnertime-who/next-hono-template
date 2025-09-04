import { PrismaClient } from "@prisma-client/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientPropertyName = `__prevent-name-collision__prisma`;

const globalForPrisma = globalThis as unknown as {
  [prismaClientPropertyName]: PrismaClient | undefined;
};

const getPrismaClient = () => {
  if (globalForPrisma[prismaClientPropertyName]) return globalForPrisma[prismaClientPropertyName];

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalForPrisma[prismaClientPropertyName] = prisma;
  return prisma;
};

export const prisma = getPrismaClient();
