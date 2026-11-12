import { Course } from "./course";
import { Faculty } from "./faculty";
import { InMemoryRepository } from "./repository";
import { Student } from "./student";
import { AssociateProfessor, Professor, type Teacher } from "./teacher";

async function main(): Promise<void> {
  console.log("=== 1. Викладачі (поліморфізм) ===");
  const prof = new Professor("t-1", "Тарас", "Шевченко", "t.shevchenko@univ.edu", 20000);
  const docent = new AssociateProfessor("t-2", "Олена", "Коваль", "o.koval@univ.edu", 16000);
  const teachers: Teacher[] = [prof, docent];
  for (const t of teachers) {
    console.log(
      `${t.getRoleDescription()} | коеф.: ${t.getWorkloadCoefficient()} | зарплата: ${t.calculateSalary()}`
    );
  }

  console.log("\n=== 2. Факультет і групи (композиція) ===");
  const faculty = new Faculty("f-1", "Факультет комп'ютерних наук");
  const group = faculty.createGroup("g-kn21", "КН-21", docent);
  console.log(`Створено групу "${group.name}" на факультеті "${faculty.name}"`);

  console.log("\n=== 3. Студенти, курс, оцінки (агрегація) ===");
  const ivan = new Student("s-101", "Іван", "Мельник", "ivan.m@univ.edu", "KB123456");
  const anna = new Student("s-102", "Анна", "Бойко", "anna.b@univ.edu", "KB123457");
  group.addStudent(ivan);
  group.addStudent(anna);

  const course = new Course("c-ts", "TypeScript Patterns", 5, prof);
  ivan.addGrade({ courseId: course.id, score: 95, date: new Date() });
  ivan.addGrade({ courseId: course.id, score: 87, date: new Date() });
  anna.addGrade({ courseId: course.id, score: 98, date: new Date() });
  anna.addGrade({ courseId: course.id, score: 92, date: new Date() });

  console.log(`GPA Івана: ${ivan.calculateGPA()}`);
  console.log(`GPA Анни: ${anna.calculateGPA()}`);
  console.log(`Середній бал групи ${group.name}: ${group.getGroupAverageScore()}`);

  console.log("\n=== 4. Репозиторій ===");
  const repo = new InMemoryRepository<Student>();
  await repo.save(ivan);
  await repo.save(anna);
  const found = await repo.findById("s-101");
  console.log(`Знайдено: ${found?.fullName} (${found?.email})`);
  console.log(`Всього студентів: ${(await repo.findAll()).length}`);
  console.log(`Видалено s-102: ${await repo.delete("s-102")}`);

  console.log("\n=== 5. Валідація ===");
  try {
    new Student("s-999", "Тест", "Тестов", "bad-email", "KB000000");
  } catch (e) {
    console.log("Очікувана помилка:", (e as Error).message);
  }
}

main().catch(console.error);
