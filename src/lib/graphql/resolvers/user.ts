import prisma from "@/lib/prisma"

export const userResolvers = {
  Query: {
    getAllUsers: async () => {
      return await prisma.user.findMany({
        include: {
          jobs: true,
        },
      })
    },
  },
  User: {
    jobs: async (parent: { id: string }) => {
      return await prisma.job.findMany({
        where: {
          userId: parent.id,
        },
      })
    },
  },
}