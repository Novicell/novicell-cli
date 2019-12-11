// node imports
import spawn from 'cross-spawn';
import path from 'path';

// 3rd pt
import { copySync, writeJsonSync, readJsonSync } from 'fs-extra';
import chalk from 'chalk';

// local
import nuxt_default_settings from '../resources/nuxt.default.settings.json';
import package_json_injectable from '../resources/package_json.inject.json';
import { choosePath, askNuxtQuestions } from './init.questions';

export const goWithDefault = async (): Promise<void> => {
  // const { SET_UP_ENV } = await setUpEnvironmentVars();
  const { INIT_PATH } = await choosePath();
  const { NAME, DESCRIPTION, AUTHOR } = await askNuxtQuestions(false);
  const MERGED_ANSWERS = {
    ...nuxt_default_settings,
    ...{
      name: NAME,
      description: DESCRIPTION,
      author: AUTHOR,
    },
  };

  const PROJECT_PATH = path.join(process.cwd(), INIT_PATH);
  createNuxtAppSync(MERGED_ANSWERS, PROJECT_PATH);
  injectResources(PROJECT_PATH);
};

export const goWithManual = async (): Promise<void> => {
  const { INIT_PATH } = await choosePath();
  const PROJECT_PATH = path.join(process.cwd(), INIT_PATH);
  createNuxtAppWithInterface(PROJECT_PATH);
};

export const setUpNuxtForTesting = (): void => {
  // Leave no answer for the user
  const PROJECT_PATH = path.join(process.cwd(), '/test');
  createNuxtAppSync({}, PROJECT_PATH);
  injectResources(PROJECT_PATH);
  spawn.sync('npm', ['run', 'build'], { stdio: 'inherit', cwd: PROJECT_PATH });
  spawn.sync('npm', ['run', 'test'], { stdio: 'inherit', cwd: PROJECT_PATH });
};

const createNuxtAppSync = (some_answers: any = {}, path: string = './'): void => {
  const MERGED_ANSWERS = { ...nuxt_default_settings, ...some_answers };
  spawn.sync('npx', ['create-nuxt-app', path, `--answers=${JSON.stringify(MERGED_ANSWERS)}`], { stdio: 'inherit' });
};

const createNuxtAppWithInterface = (path: string) => spawn.sync('npx', ['create-nuxt-app', path], { stdio: 'inherit' });

const injectResources = async (target_dir: string): Promise<void | Error> => {
  // webpack considers __dirname as novicell-cli/dist, therefore:
  const CLI_RESOURCES_PATH = path.join(__dirname, '../resources/spa-cms-setup');
  try {
    copySync(CLI_RESOURCES_PATH, path.join(target_dir));
    console.log(chalk.green('Installing') + ' dependencies required by default Novicell setup');
    spawn.sync('npm', ['install', ...package_json_injectable.dependencies], { stdio: 'inherit', cwd: target_dir });
    spawn.sync('npm', ['install', '-D', ...package_json_injectable.devDependencies], { stdio: 'inherit', cwd: target_dir });
    const TARGET_PACKAGE_JSON_PATH = path.join(target_dir + '/package.json');
    const TARGET_PACKAGE_JSON_DATA = readJsonSync(TARGET_PACKAGE_JSON_PATH);
    const MERGED_SCRIPTS = { ...TARGET_PACKAGE_JSON_DATA.scripts, ...package_json_injectable.scripts };
    writeJsonSync(path.join(target_dir + '/package.json'), { ...TARGET_PACKAGE_JSON_DATA, scripts: MERGED_SCRIPTS }, { replacer: null, spaces: 4 });
    console.log(chalk.green('Successfully ') + 'injected SPA+CMS setup to your working dir.');
  } catch (error) {
    return error;
  }
};
