import prisma from "@/lib/prisma"

export const reminderResolvers = {
  Query: {
    getRemindersByJob: async (_: any, { jobId }: { jobId: string }) => {
      return prisma.reminder.findMany({
        where: { jobId },
        orderBy: { dueDate: "asc" },
      })
    },
  },
  Mutation: {
    createReminder: async (
      _: any,
      { jobId, title, dueDate }: { jobId: string; title: string; dueDate: string }
    ) => {
      return prisma.reminder.create({
        data: { jobId, title, dueDate },
      })
    },

    deleteReminder: async (_: any, { id }: { id: string }) => {
      await prisma.reminder.delete({ where: { id } })
      return true
    },
  },
  Reminder: {
    job: (parent: any) => {
      return prisma.job.findUnique({
        where: { id: parent.jobId },
      })
    },
  },
}