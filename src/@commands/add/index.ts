import chalk from 'chalk';
import { FeatureList } from '@models/feature.interface';
import {
  createDockerfile,
  createNginxConfig,
  deployQuestions,
} from '@commands/add/deploy_tools/deploy.functions';
import { didYouMean } from '@utils/index';

const features: FeatureList = {
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
    case features.deploy.value:
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
    // ADD COMPONENT
    case features.component.value:
      console.log('Add component');
      return;
    default:
      didYouMean(feature_name, features);
  }
};

export const add_opts = () => {
  console.log('');
  console.log('Features: ');
  for (const key in features) {
    console.log(
      `${chalk.blueBright(features[key].value)} - ${features[key].description}`,
    );
  }
};
