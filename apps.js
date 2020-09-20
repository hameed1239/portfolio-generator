const fs = require('fs');
const generatePage = require('./src/page-template');

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!')
// });

const inquirer = require('inquirer');
const promptUser = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: gitHubInput => {
                if (gitHubInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }

    ]);
}


const promptProject = portfolioData => {
    //If ther's no projects array property, Create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
=============================
Add a New Project
=============================    
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you create this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself: ',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            },
            when: ({confirmAbout}) => confirmAbout
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            }
            else {
                return portfolioData;
            }
        })
}

const mockData = {
    name: 'hameed',
    github: 'hmeed1239',
    about: 'I love coding',
    projects: [
        {
            name: 'portfolio generator',
            description: 'portfolio generator  krngkg pgsklrgnrough rnng spjgwrngjnd; d;jjs; g;sotgh lig rtgtrlhg rtogh tr;g tjghhg iot ghtoeighteghtegh iojhuihtgiohjo  oihhuohoitheg iohuohyoiet oihoteihgyoejtgoie ;eoihoetgeioj s;he;ghlguht98 luhgotgheto spjgwrngjnd; d;jjs; g;sotgh lig rtgtrlhg rtogh tr;g tjghhg iot ghtoeighteghtegh iojhuihtgiohjo  oihhuohoitheg iohuohyoiet oihoteihgyoejtgoie ;eoihoetgeioj s;he;ghlguht98 luhgotgheto  spjgwrngjnd; d;jjs; g;sotgh lig rtgtrlhg rtogh tr;g tjghhg iot ghtoeighteghtegh iojhuihtgiohjo  oihhuohoitheg iohuohyoiet oihoteihgyoejtgoie ;eoihoetgeioj s;he;ghlguht98 luhgotgheto  ',
            languages: ['Java','CSS','Node','JavaScript','HTML',],
            link: 'https://hameed.kazeem',
            feature: true,
            confirmAddProject: true,
            confirmAbout: true,
            about: 'This is the only project that should have an about info'
        },
        {
            name: 'Weather map',
            description: 'Weather map',
            languages: ['Java','CSS','JavaScript','HTML',],
            link: 'https://hameed.kazeem',
            feature: true,
            confirmAddProject: true,
            confirmAbout: false
        },
        {
            name: 'Robot Gladiators',
            description: 'Robot Gladiators kdmvdjo  pojagvkjfpja jgaj grjnpgi anjd gpn gkd;gouet n gijirjfsdkfjrsf  srlgksrj gjsrjfsklgnv spjgwrngjnd; d;jjs; g;sotgh lig rtgtrlhg rtogh tr;g tjghhg iot ghtoeighteghtegh iojhuihtgiohjo  oihhuohoitheg iohuohyoiet oihoteihgyoejtgoie ;eoihoetgeioj s;he;ghlguht98 luhgotgheto  spjgwrngjnd; d;jjs; g;sotgh lig rtgtrlhg rtogh tr;g tjghhg iot ghtoeighteghtegh iojhuihtgiohjo  oihhuohoitheg iohuohyoiet oihoteihgyoejtgoie ;eoihoetgeioj s;he;ghlguht98 luhgotgheto isrjgskdjgmpsjsgn s srogjs prjp gjsrjgs',
            languages: ['Java','CSS','Node','JavaScript','HTML',],
            link: 'https://hameed.kazeem',
            feature: false,
            confirmAddProject: false,
            confirmAbout: false
        }
    ]
};
// promptUser()
//     .then(promptProject)
    // .then(portfolioData => {
        // const pageHTML = generatePage(portfolioData);
        const pageHTML = generatePage(mockData);

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log('Page created! Check out index.html in this directory to see it!');
        });
    // });