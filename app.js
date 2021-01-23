// Left To Do: 
// 1. Edit CSS of team.html page.

// Require all necessary js files and modules.
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
const { type } = require("os");
const employeesArray = [];

// Function to start up the application.
function appMenu() {
    console.log("Please build your team...");

    // Validation functions.
    function validateName(name) {
        var validName = /^[a-z ,.'-]+$/i;
        return validName.test(name) || console.log(" Please enter a valid name");
    };
    function validateNum(num) {
        var validNum = /^\d+$/;
        return validNum.test(num) || console.log("  Please enter a valid number");
    };
    function validateEmail(email) {
        var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return validEmail.test(email) || console.log("  Please enter a valid email.");
    };
    function validateGithub(github) {
        var validGithub = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        return validGithub.test(github) || console.log("Please enter a valid Github link.");
    };
    function validateSchool(school) {
        var validSchool = /^[a-z ,.'-]+$/i;
        return validSchool.test(school) || console.log(" Please enter a valid school name");
    };

    // Function that builds the manager object.
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: validateName,
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: validateNum,
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: validateEmail,
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: validateNum,
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

    // Function that builds the engineer object.
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: validateName,
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: validateNum,
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: validateEmail,
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's github?",
                validate: validateGithub,
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

    // Function that builds the intern object.
    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: validateName,
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: validateNum,
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: validateEmail,
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                validate: validateSchool,
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            console.log(intern);
            employeesArray.push(intern)
            createTeam(employeesArray);
        })
    }

    // Function that takes in the employee objects and renders them to HTML and writes it on the page.
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