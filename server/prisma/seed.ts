import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const task1 = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      label: 'task1',
      done: true
    }
  })

  const task2 = await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      label: 'task2',
      done: false
    }
  })

  const post1 = await prisma.post.upsert({
    where: { id: 'samplepost001' },
    update: {},
    create: {
      id: 'samplepost001',
      title: 'Sample Post 001',
      slug: 'sample_post_001',
      elements: {},
      created: new Date(),
      from: new Date(),
      to: new Date()
    }
  })

  const post2 = await prisma.post.upsert({
    where: { id: 'samplepost002' },
    update: {},
    create: {
      id: 'samplepost002',
      title: 'Sample Post 002',
      slug: 'sample_post_002',
      elements: {},
      created: new Date(),
      from: new Date(),
      to: new Date()
    }
  })

  console.log({ task1, task2, post1, post2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
