const prisma = require("./prismaclient");
const bcrypt = require("bcrypt");

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // USERS
  await prisma.user.createMany({
    data: [
      {
        name: "HOD User",
        email: "hod@test.com",
        password,
        role: "HOD",
      },
      {
        name: "Staff User",
        email: "staff@test.com",
        password,
        role: "STAFF",
      },
      {
        name: "Student User",
        email: "student@test.com",
        password,
        role: "STUDENT",
      },
    ],
    skipDuplicates: true,
  });

  // SUBJECTS
  await prisma.subject.createMany({
    data: [
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Computer Networks" },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded users and subjects");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
