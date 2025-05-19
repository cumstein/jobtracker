import  prisma  from '@/lib/prisma';

export const tagResolvers = {
  Query: {
    getAllTags: async () => {
      return await prisma.tag.findMany({
        include: {
          jobs: true,
        },
      });
    },
  },
  Mutation: {
    createTag: async (_: any, { name }: { name: string }) => {
      return await prisma.tag.create({
        data: { name },
      });
    },
    deleteTag: async (_: any, { id }: { id: string }) => {
      await prisma.tag.delete({
        where: { id },
      });
      return true;
    },
  },
};