import inquirer from "inquirer";

class Student {
  id: string;
  name: string;
  coursesEnrolled: string[];
  feesAmount: number;

  constructor(
    id: string,
    name: string,
    coursesEnrolled: string[],
    feesAmount: number
  ) {
    this.id = id;
    this.name = name;
    this.coursesEnrolled = coursesEnrolled;
    this.feesAmount = feesAmount;
  }
}

let baseId = 10000;
let studentId: string = "";
let continueEnrollment = true;

let students: Student[] = [];

do {
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: "Please select an option:\n",
    choices: ["Enroll a student", "Show student status"],
  });

  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "ans",
      message: "Please Enter your name:",
    });

    let trimmedStudentName = studentName.ans.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);

    if (studentNameCheck.includes(trimmedStudentName) === false) {
      if (trimmedStudentName !== "") {
        baseId++;
        studentId = "STID" + baseId;

        console.log("\n\tYour account has been created");
        console.log(`Welcome, ${trimmedStudentName}!`);

        let course = await inquirer.prompt({
          type: "list",
          name: "ans",
          message: "Please select a course",
          choices: [
            "SEO",
            "Digital Marketing",
            "Graphic Designing",
            "Wordpress",
          ],
        });

        let courseFees = 0;
        switch (course.ans) {
          case "SEO":
            courseFees = 8000;
            break;

          case "Digital Marketing":
            courseFees = 10000;
            break;

          case "Graphic Designing":
            courseFees = 5000;
            break;

          case "Wordpress":
            courseFees = 7000;
            break;
        }

        let courseConfirm = await inquirer.prompt({
          type: "confirm",
          name: "ans",
          message: "Would you like to enroll in this course?",
        });

        if (courseConfirm.ans === true) {
          let student = new Student(
            studentId,
            trimmedStudentName,
            [course.ans],
            courseFees
          );

          students.push(student);

          console.log("You have enrolled in this course!");
        }
      } else {
        console.log("Invalid name");
      }
    } else {
      console.log("This name already exists");
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNamesCheck = students.map((e) => e.name);

      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select name",
        choices: studentNamesCheck,
      });

      let foundStudent = students.find(
        (student) => student.name === selectedStudent.ans
      );

      console.log("Student information");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is empty");
    }
  }

  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?",
  });

  if (userConfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);
