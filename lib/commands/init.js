const showBanner = require('../utils/banner');
const fs = require('fs');
const inquirer= require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const os = require('os');

let taskCount = 0;

let initialize = () => {
	showBanner();
	// Warning the user if he/she fires in the command again.
	setTimeout(() => {
	if(fs.existsSync(process.cwd() + '/Teach-Code-solutions')){
		console.log(chalk.red('\n  Teach-Code-solutions directory already exists in the current directory\n'));
		console.log(chalk.magentaBright('  Exiting!!\n'));
		process.exit(1);
	}

	if(fs.existsSync(process.cwd() + '/config.json')){
		console.log(process.cwd());
		console.log(chalk.red('\n  Teach-Code-solutions directory already exists in the current directory\n'));
		console.log(chalk.magentaBright('\tExiting!!\n'));
		process.exit(1);
	}

	if(os.platform() !== 'win32')
		shell.exec(`mkdir ${process.cwd()}/Teach-Code-solutions`);
	else
		shell.exec(`mkdir Teach-Code-solutions`);
	shell.cd('Teach-Code-solutions');
}, 100);
	setTimeout(() => {

		console.log(chalk.green('\n Welcome to Teach-Code\n\n\t\t Points to ponder \n\n 1. Solution files are auto-created\n 2. Print out exactly what is required as given in the task\n 3.You can vew the previuosly submitted tasks anytime \n\n Give your name below and type in:-\n'));
		console.log(chalk.magenta('  cd Teach-Code-solutions\n  teach-code fetchtask 5e06b81d-e9ac-4321-8a97-4785ffce8146\n'));
		inquirer.prompt([
				{
					name: 'username',
					type: 'input',
					message: 'What\'s your name:-'
				}
			])
		.then(answers => {
			if(answers.username === ''){
				console.log(chalk.red('\nName is required!\n'));
				shell.cd('../');
				if(process.platform !== 'win32')
					shell.exec('rm -r Teach-Code-solutions');
				else
					shell.exec('rmdir Teach-Code-solutions');	
				process.exit(1);
			}
			fs.writeFileSync(process.cwd()+ '/config.json', `{\n  "username": "${answers.username}",\n "taskCount": ${taskCount},\n "keys": ["5e06b81d-e9ac-4321-8a97-4785ffce8146"]\n,\n "files": []}`);
		});
		}, 100);
}

module.exports = initialize;