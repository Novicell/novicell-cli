import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';

export const initQuestions: () => Promise<any> = async () => {
  let fullAnswers = {};

  const routeAnswer = await inquirer
    .prompt({
      name: 'WHICH_ROUTE',
      type: 'list',
      message: 'Choose preferred setup option',
      choices: ['Default setup', 'Manual setup'],
    })
    .then(async (res: any) => {
      let answers = { ...res };
      return answers;
    });

  fullAnswers = { ...fullAnswers, ...routeAnswer };

  return fullAnswers;
};

export const goWithDefault = () => {
  console.log('go With Default');
};

export const goWithManual = () => {
  console.log('go With Manual');
};
