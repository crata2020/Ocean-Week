const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.registration.findFirst({
    where: {
      phoneRaw: '01095126575',
      name: '김준영'
    }
  });
  console.log(JSON.stringify(user));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
