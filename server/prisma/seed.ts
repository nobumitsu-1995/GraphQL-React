import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ユーザーを作成
  const user1 = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: '田中太郎',
      email: 'tanaka@example.com',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: '佐藤花子',
      email: 'sato@example.com',
    },
  })

  // Todoを作成
  const todo1 = await prisma.todo.create({
    data: {
      id: uuidv4(),
      content: 'GraphQLの勉強をする',
      status: 'PENDING',
      userId: user1.id,
    },
  })

  const todo2 = await prisma.todo.create({
    data: {
      id: uuidv4(),
      content: 'Reactアプリを作る',
      status: 'IN_PROGRESS',
      userId: user1.id,
    },
  })

  const todo3 = await prisma.todo.create({
    data: {
      id: uuidv4(),
      content: '買い物に行く',
      status: 'DONE',
      userId: user2.id,
    },
  })

  console.log('✅ Seeding completed!')
  console.log('Created users:', { user1, user2 })
  console.log('Created todos:', { todo1, todo2, todo3 })
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 