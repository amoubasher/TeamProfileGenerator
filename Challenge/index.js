
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
        return `<a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a>
                <h2> Engineer </h2>`
    } else if(employee.getRole() === "Intern") {
        return `<p> School: ${employee.getSchool()} </p>
                <h2> Intern </h2>`
    } else {
        return `<p> Office Number: ${employee.getOfficeNumber()} </p>
                <h2> Manager </h2>`
    }
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
        <title>Meet The Team!</title>
</head>
<body class="bg-dark">

    <div class="container-fluid p-5 bg-primary text-white text-center">
        <h1>Meet the Team!</h1> 
    </div>

    <!-- ADD A CARD BOOTSTRAP TO EACH DIV, STYLE ACCORDINGLY -->
    <div class="container-fluid mt-5">
        <div>
            <ul class="row text-center" style="list-style: none;">
                ${employees.map(employee => /*html*/`
                    <li class="col-sm-4">
                        <div class="card mx-auto col bg-light" style="width:400px; height:400px">
                            <div class="card-body d-flex flex-column"> 
                                <h1 class="card-title mb-5">${employee.getName()}</h1>
                                    <div>
                                        <a class="mt-5" href="mailto:${employee.getEmail()}">${employee.getEmail()}</a>
                                        <p class="align-bottom">${section(employee)}</p>
                                    </div>
                            </div>
                        </div>
                    </li>
            </ul>
        </div>
    </div>

</body>
</html>
    `)
}
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