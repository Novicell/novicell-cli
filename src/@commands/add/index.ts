import chalk from 'chalk';
import { FeatureList } from '@models/feature.interface';
import { deployQuestions } from '@commands/add/deploy_tools/deploy.functions';
// @ts-ignore
import nginxConfig from './deploy_tools/resources/nginx.conf';
// @ts-ignore
import dockerFile from './deploy_tools/resources/Dockerfile';
// Utils
import { create_file } from '@utils/index';
import { didYouMean } from '@utils/index';

export const add_features: FeatureList = {
  deploy: {
    value: 'deploy_tools',
    description: 'Adds NGINX and Dockerfile ready to ship',
  },
  component: { value: 'component', description: 'Add component to a project' },
};

export const add = async (feature_name: string) => {
  // Deploy Tools
  switch (feature_name) {
    // ADD DEPLOY TOOLS
    case add_features.deploy.value:
      console.log('Create default Nuxt hosting setup:');

      const answers = await deployQuestions();

      if (answers.NGINX_CONF_GENERATE) {
        // Should create nginx config file
        const filePath = await create_file(
          answers.NGINX_CONF_PATH,
          'nginx.conf',
          nginxConfig,
        );
        console.log(chalk.green`Created Nginx config file in ${filePath}`);
      }

      if (answers.DOCKER_CONF_GENERATE) {
        // Should create nginx config file
        const filePath = await create_file(
          answers.DOCKER_CONF_PATH,
          'Dockerfile',
          dockerFile,
        );
        console.log(chalk.green`Created Dockerfile ${filePath}`);
      }
      return;

    // ADD COMPONENT
    case add_features.component.value:
      console.log('Add component');
      return;
    default:
      didYouMean(feature_name, add_features);
  }
};
