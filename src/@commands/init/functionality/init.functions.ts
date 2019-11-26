import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import { copySync } from 'fs-extra';
import * as fs from 'fs';
import { create_file } from '@utils/index';

export const initQuestions: () => Promise<any> = () =>
  inquirer.prompt({
    name: 'WHICH_ROUTE',
    type: 'list',
    message: 'Choose preferred setup option',
    choices: ['Default setup', 'Manual setup'],
  });

export const goWithDefault = async () => {
  const { INIT_PATH } = await choosePath();

  // webpack considers __dirname as novicell-cli/dist, therefore:
  const project_slash_resources = path.join(__dirname, '../resources/spa-cms-setup');

  try {
    copySync(project_slash_resources, path.join(process.cwd(), INIT_PATH));
    console.log(chalk.green('Successfully ') + 'coppied SPA+CMS setup to your working dir.');
  } catch (error) {
    console.log(error);
  }
};

export const goWithManual = () => {
  console.log('go With Manual');
};

const choosePath = async (): Promise<any> =>
  inquirer.prompt({
    type: 'input',
    name: 'INIT_PATH',
    message: 'Where should we initialize?',
    default: './',
  });
