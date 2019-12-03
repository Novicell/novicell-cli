// node imports
import { spawnSync } from 'child_process';
import path from 'path';

// 3rd pt
import { copySync } from 'fs-extra';
import chalk from 'chalk';

// local
import nuxt_default_settings from '../nuxt.default.settings.json';
import { choosePath, askNuxtQuestions } from './init.questions';

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

  const project_path = path.join(process.cwd(), INIT_PATH);
  createNuxtAppSync(merged_answers, project_path);
  // spawnSync('npx.cmd', ['create-nuxt-app', project_path, `--answers=${JSON.stringify(merged_answers)}`], { stdio: 'inherit' });
};

export const goWithManual = () => {
  console.log('go With Manual');
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
  const cli_resources_path = path.join(__dirname, '../resources/spa-cms-setup');
  try {
    copySync(cli_resources_path, path.join(process.cwd(), INIT_PATH));
    console.log(chalk.green('Successfully ') + 'coppied SPA+CMS setup to your working dir.');
  } catch (error) {
    console.log(error);
  }
};
