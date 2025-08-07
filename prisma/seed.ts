import { PrismaClient } from '../generated/prisma'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  // Create permissions
  await prisma.permission.createMany({
    data: [
      { name: 'create:user' },
      { name: 'view:user' },
      { name: 'delete:user' },
      { name: 'update:user' },
    ],
    skipDuplicates: true,
  })

  // Create organization
  const organization =
    await prisma.organization.create({
      data: {
        name: 'Acme Inc.',
      },
    })

  // Create roles with permissions
  const viewer = await prisma.role.create({
    data: {
      name: 'Viewer',
      organizationId: organization.id,
      permissions: {
        create: [
          {
            permission: {
              connect: { name: 'view:user' },
            },
          },
        ],
      },
    },
  })

  const manager = await prisma.role.create({
    data: {
      name: 'Manager',
      organizationId: organization.id,
      permissions: {
        create: [
          {
            permission: {
              connect: { name: 'update:user' },
            },
          },
        ],
      },
    },
  })

  const admin = await prisma.role.create({
    data: {
      name: 'Admin',
      organizationId: organization.id,
      permissions: {
        create: [
          {
            permission: {
              connect: { name: 'delete:user' },
            },
          },
        ],
      },
    },
  })

  // Create role inheritance graph
  await prisma.roleInheritance.createMany({
    data: [
      {
        fromRoleId: manager.id,
        toRoleId: viewer.id,
      },
      {
        fromRoleId: admin.id,
        toRoleId: manager.id,
      },
    ],
  })
  const hash = await argon2.hash('12345678')
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'carlos@example.com',
      name: 'Carlos Fortunato',
      hash,
    },
  })

  // Create membership for test user
  await prisma.membership.create({
    data: {
      userId: user.id,
      organizationId: organization.id,
      roleId: admin.id,
    },
  })

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
