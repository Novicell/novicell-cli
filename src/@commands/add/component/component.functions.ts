import inquirer from 'inquirer';

export const componentQuestions: () => Promise<any> = async () => {
  let fullAnswers = {};

  const name = await inquirer.prompt({
    name: 'COMPONENT_NAME',
    type: 'input',
    message: 'Component name:',
  });

  fullAnswers = { ...fullAnswers, ...name };

  const location = await inquirer.prompt({
    name: 'COMPONENT_PATH',
    type: 'input',
    message: 'Where should we generate the component?',
    default: './components/',
  });

  fullAnswers = { ...fullAnswers, ...location };

  return fullAnswers;
};
