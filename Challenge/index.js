
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

const employees = [];

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: "position",
            message: "What is your position in this company?",
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                // 'Employee'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your Email?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your ID?'
        }
    ]).then(({ position, email, id, name }) => {
        switch(position){
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is your office number?'
                    }
                ]).then(({ officeNumber }) => {
                    employees.push(new Manager(
                        name,
                        id,
                        email,
                        officeNumber
                    ))
                    another()
                })
                break;
            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'What school do you attend?'
                    }
                ]).then(({ school }) => {
                    employees.push(new Intern(
                        name,
                        id,
                        email,
                        school
                    ))
                    another()
                })
                break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'Enter your Github profile'
                    }
                ]).then(({ github }) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        github
                    ))
                    another()
                })
                break;
            default:
                //uh oh
        }
    })
}

function another() {
    
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another employee?'
        }
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })

}

function section(employee) {
    if(employee.getRole() === "Engineer"){
        return `<a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a>`
    } else if(employee.getRole() === "Intern") {
        return `School: ${employee.getSchool()}`
    } else {
        return `Office Number: ${employee.getOfficeNumber()}`
    }
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`
        <ul>
            ${employees.map(employee => /*html*/`
                <li>
                    <div>
                        <h1>${employee.getName()}</h1>
                        <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>
                        ${section(employee)}
                    </div>
                </li>
            `)}
        </ul>
    `)
}

// function renderHTMLFile() {
//     fs.writeFileSync('./index.html', /*html*/`
//         <ul>
//             ${employees.map(employee => /*html*/`
//                 <li>
//                     <div>
//                         <h1>${employee.getName()}</h1>
//                         <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>
//                         ${section(employee)}
//                     </div>
//                 </li>
//             `)}
//         </ul>
//     `)
// }

newEmployee()