// Left To Do: 
// 1. Edit CSS of team.html page.
// 2. Validate inquirer inputs.

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const employeesArray = [];

function appMenu() {
    console.log("Please build your team...");
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?"
            },
            {
                type: "confirm",
                name: "nextEmployee",
                message: "Would you like to create another employee?",
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            employeesArray.push(manager)
            if (answers.nextEmployee === true) {
                console.log("Let's make an Engineer");
                createEngineer();
            } else {
                createTeam(employeesArray);
            }
        })
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's github?"
            },
            {
                type: "confirm",
                name: "nextEmployee",
                message: "Would you like to create another employee?",
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            console.log(engineer);
            employeesArray.push(engineer)
            if (answers.nextEmployee === true) {
                console.log("Let's make an Intern");
                createIntern();
            } else {
                createTeam(employeesArray);
            }
        })
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            console.log(intern);
            employeesArray.push(intern)
            createTeam(employeesArray);
        })
    }

    function createTeam(array) {
        fs.writeFile(outputPath, render(array), "utf-8", (err) => {
            if (err) throw err;
            console.log('HTML has been rendered');
            console.log(array);
        })
    };


    createManager();
}
appMenu();