import prisma from "@/lib/prisma";

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
    filteredJobs: async (_: any, { filters }: any, { user }: any) => {
      if (!user) throw new Error("Unauthorized");

      const { search, status, tags, page = 1, limit = 5 } = filters;
      const skip = (page - 1) * limit;

      const where: any = {
        userId: user.id,
      };

      if (search) {
        where.title = { contains: search, mode: "insensitive" };
      }

      if (status) {
        where.status = status;
      }

      if (tags && tags.length > 0) {
        where.tags = {
          some: {
            id: { in: tags },
          },
        };
      }

      const [jobs, count] = await Promise.all([
        prisma.job.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: { tags: true, user: true },
        }),
        prisma.job.count({ where }),
      ]);

      return { jobs, count };
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
      const data: any = {
        title: title,
        company: company ?? "",
        description: description ?? "",
        location: location ?? "",
        tags: tagIds ? { connect: tagIds.map((id) => ({ id })) } : undefined,
      };
      if (userId) {
        data.user = { connect: { id: userId } };
      }
      return prisma.job.create({
        data,
      });
    },
  },
};
