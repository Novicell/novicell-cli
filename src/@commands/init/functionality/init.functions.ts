// node imports
import { spawnSync } from 'child_process';
import path from 'path';

// 3rd pt
import inquirer from 'inquirer';
import { copySync } from 'fs-extra';
import { create_file } from '@utils/index';
import chalk from 'chalk';

// local
import nuxt_default_settings from '../nuxt.default.settings.json';

export const initQuestions: () => Promise<any> = () =>
  inquirer.prompt({
    name: 'WHICH_ROUTE',
    type: 'list',
    message: 'Choose preferred setup option',
    choices: ['Default setup', 'Manual setup'],
  });

export const goWithDefault = async () => {
  // const { SET_UP_ENV } = await setUpEnvironmentVars();
  const { INIT_PATH } = await choosePath();
  const { NAME, DESCRIPTION, AUTHOR } = await askNuxtQuestions(false);
  const merged_answers = {
    ...nuxt_default_settings,
    ...{
      name: NAME,
      description: DESCRIPTION,
      author: AUTHOR,
    },
  };

  createNuxtAppSync(merged_answers, INIT_PATH);
  const project_path = path.join(process.cwd(), INIT_PATH);
  spawnSync('npx.cmd', ['create-nuxt-app', path, `--answers=${JSON.stringify(merged_answers)}`], { stdio: 'inherit' });
};

export const goWithManual = () => {
  console.log('go With Manual');
};

const choosePath = async (): Promise<any> =>
  inquirer.prompt({
    type: 'input',
    name: 'INIT_PATH',
    message: 'Destination path: ',
    default: './',
  });

/** @param {boolean} ask_extra if TRUE asks for manual questions. If FALSE, only asks for required questions */
const askNuxtQuestions = async (ask_extra: boolean): Promise<any> => {
  const mandatory_questions = [
    {
      type: 'input',
      name: 'NAME',
      message: 'Project name: ',
    },
    {
      type: 'input',
      name: 'DESCRIPTION',
      message: 'Project description: ',
    },
    {
      type: 'input',
      name: 'AUTHOR',
      message: 'Author: ',
      default: 'Novicell',
    },
  ];

  const extra_questions = [
    {
      type: 'input',
      name: 'INIT_PATH',
      message: 'Destination path: ',
      default: './',
    },
  ];
  const final_questions = [...mandatory_questions, ...(ask_extra ? extra_questions : [])];

  return inquirer.prompt(final_questions);
};

export const setUpNuxtForTesting = () => {
  // Leave no answer for the user
  return createNuxtAppSync();
};

const createNuxtAppSync = (some_answers: any = {}, path: string = './') => {
  const merged_answers = { ...nuxt_default_settings, ...some_answers };
  return spawnSync('npx.cmd', ['create-nuxt-app', path, `--answers=${JSON.stringify(merged_answers)}`], { stdio: 'inherit' });
};

const copyResources = async (INIT_PATH: 'string') => {
  // webpack considers __dirname as novicell-cli/dist, therefore:
  const project_slash_resources = path.join(__dirname, '../resources/spa-cms-setup');
  try {
    copySync(project_slash_resources, path.join(process.cwd(), INIT_PATH));
    console.log(chalk.green('Successfully ') + 'coppied SPA+CMS setup to your working dir.');
  } catch (error) {
    console.log(error);
  }
};
