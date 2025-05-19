import {prisma} from "@/lib/prisma";

export const jobResolvers = {
  Query: {
    getAllJobs: async () => {
      return prisma.job.findMany({ include: { tags: true, user: true } });
    },
    getJobById: async (_: any, { id }: { id: string }) => {
      return prisma.job.findUnique({
        where: { id },
        include: { tags: true, user: true },
      });
    },
  },
  Mutation: {
    createJob: async (
      _: any,
      args: {
        title: string;
        company?: string;
        description?: string;
        location?: string;
        tagIds?: string[];
        userId?: string;
      }
    ) => {
      const {
        title,
        company,
        description,
        location = "",
        tagIds,
        userId,
      } = args;
      return prisma.job.create({
        data: {
          title: title,
          company: company ?? "",
          description: description ?? "",
          location: location ?? "",
          ...(args.userId && { user: { connect: { id: userId } } }),
          tags: tagIds ? { connect: tagIds.map((id) => ({ id })) } : undefined,
        },
      });
    },
  },
};
