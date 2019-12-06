// node imports
import spawn from 'cross-spawn';
import path from 'path';

// 3rd pt
import { copySync, writeJsonSync, readJsonSync } from 'fs-extra';
import chalk from 'chalk';

// local
import nuxt_default_settings from '../nuxt.default.settings.json';
import package_json_injectable from '../package_json_inject.json';
import { choosePath, askNuxtQuestions } from './init.questions';

export const goWithDefault = async (): Promise<void> => {
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
  injectResources(project_path);
};

export const goWithManual = async (): Promise<void> => {
  const { INIT_PATH } = await choosePath();
  const project_path = path.join(process.cwd(), INIT_PATH);
  createNuxtAppWithInterface(project_path);
};

export const setUpNuxtForTesting = (): void => {
  // Leave no answer for the user
  const project_path = path.join(process.cwd(), '/test');
  createNuxtAppSync({}, project_path);
  injectResources(project_path);
  spawn.sync('npm', ['run', 'build:test'], { stdio: 'inherit', cwd: project_path });
};

const createNuxtAppSync = (some_answers: any = {}, path: string = './'): void => {
  const merged_answers = { ...nuxt_default_settings, ...some_answers };
  spawn.sync('npx', ['create-nuxt-app', path, `--answers=${JSON.stringify(merged_answers)}`], { stdio: 'inherit' });
};

const createNuxtAppWithInterface = (path: string) => spawn.sync('npx', ['create-nuxt-app', path], { stdio: 'inherit' });

const injectResources = async (target_dir: string): Promise<void | Error> => {
  // webpack considers __dirname as novicell-cli/dist, therefore:
  const cli_resources_path = path.join(__dirname, '../resources/spa-cms-setup');
  try {
    copySync(cli_resources_path, path.join(target_dir));
    console.log(chalk.green('Installing') + ' dependencies required by default Novicell setup');
    spawn.sync('npm', ['install', ...package_json_injectable.dependencies], { stdio: 'inherit', cwd: target_dir });
    spawn.sync('npm', ['install', '-D', ...package_json_injectable.devDependencies], { stdio: 'inherit', cwd: target_dir });
    const target_package_json_path = path.join(target_dir + '/package.json');
    const target_package_json_data = readJsonSync(target_package_json_path);
    const merged_scripts = { ...target_package_json_data.scripts, ...package_json_injectable.scripts };
    writeJsonSync(path.join(target_dir + '/package.json'), { ...target_package_json_data, scripts: merged_scripts }, { replacer: null, spaces: 4 });
    console.log(chalk.green('Successfully ') + 'injected SPA+CMS setup to your working dir.');
  } catch (error) {
    return error;
  }
};
