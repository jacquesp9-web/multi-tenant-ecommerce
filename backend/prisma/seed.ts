import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log('Seeding the Platform Admin Users');

  const email = 'jacquesp9@gmail.com';
  const password = 'P0tgieter12#$';

  const passwordHash = await bcrypt.hash(password, 10);

  /* Seeding for the Login */
  await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      passwordHash: passwordHash,
    },
    create: {
      email,
      fullName: 'Jacques Potgieter',
      passwordHash,
      userType: 'PLATFORM_ADMIN',
      twoFactorEnabled: false,
      phone: '+27847673006',
    },
  });

  console.log('\n User Created Successfully');
}

main();
