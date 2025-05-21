import  prisma  from "./prisma";

export async function getJobById(id: string) {
  return await prisma.job.findUnique({
    where: { id },
  });
}
