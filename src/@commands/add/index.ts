import chalk from 'chalk';
import {
  createDockerfile,
  createNginxConfig,
  deployQuestions,
} from '@commands/add/deploy_tools/deploy.functions';
import { didYouMean } from '@utils/index';

const features = {
  deploy: {
    value: 'deploy_tools',
    description: 'Adds NGINX and Dockerfile ready to ship',
  },
};

export const add = async (feature_name: string) => {
  // Deploy Tools
  if (feature_name === features.deploy.value) {
    console.log('Create default Nuxt hosting setup:');

    const answers = await deployQuestions();

    if (answers.NGINX_CONF_GENERATE) {
      // Should create nginx config file
      const filePath = await createNginxConfig(answers.NGINX_CONF_PATH);
      console.log(chalk.green`Created Nginx config file in ${filePath}`);
    }

    if (answers.DOCKER_CONF_GENERATE) {
      // Should create nginx config file
      const filePath = await createDockerfile(answers.DOCKER_CONF_PATH);
      console.log(chalk.green`Created Dockerfile ${filePath}`);
    }
    return;
  }

  didYouMean(feature_name, features);
};
