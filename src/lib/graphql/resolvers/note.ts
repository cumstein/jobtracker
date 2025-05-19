import prisma from '@/lib/prisma'

export const noteResolvers = {
  Query: {
    getNotesByJob: async (_: any, { jobId }: { jobId: string }) => {
      return await prisma.note.findMany({
        where: { jobId },
        orderBy: { createdAt: 'desc' },
      })
    },
  },
  Mutation: {
    createNote: async (
      _: any,
      { jobId, content }: { jobId: string; content: string }
    ) => {
      return await prisma.note.create({
        data: {
          jobId,
          content,
        },
      })
    },
    deleteNote: async (_: any, { id }: { id: string }) => {
      try {
        await prisma.note.delete({
          where: { id },
        })
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
}