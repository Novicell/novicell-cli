// node imports
import { spawn } from 'child_process';
import path from 'path';

// 3rd pt
import inquirer from 'inquirer';
import { create_file } from '@utils/index';

// local
import nuxt_ask_always from '../nuxt.ask.always.json';
import nuxt_ask_manually from '../nuxt.ask.manually.json';

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

  // webpack considers __dirname as novicell-cli/dist, therefore:
  const project_slash_resources = path.join(__dirname, '../resources/spa-cms-setup');

  // try {
  //   copySync(project_slash_resources, path.join(process.cwd(), INIT_PATH));
  //   console.log(chalk.green('Successfully ') + 'coppied SPA+CMS setup to your working dir.');
  // } catch (error) {
  //   console.log(error);
  // }
  setUpNuxtForTesting();
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

const setUpNuxt = async (ask_extra: boolean): Promise<any> => {
  console.log('Lets set up .env file');
  inquirer.prompt([
    {
      type: 'input',
      name: 'INIT_PATH',
      message: 'Destination path: ',
      default: './',
    },
  ]);

  if (ask_extra) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'INIT_PATH',
        message: 'Destination path: ',
        default: './',
      },
    ]);
  }
};

const setUpNuxtForTesting = async (): Promise<any> => {
  // Leave no answer for the user
  const merged_answers = { ...nuxt_ask_always, ...nuxt_ask_manually };
  console.log(merged_answers);

  spawn('npx.cmd', ['create-nuxt-app', 'testas', `--answers=${JSON.stringify(merged_answers)}`], { stdio: 'inherit' });
};
