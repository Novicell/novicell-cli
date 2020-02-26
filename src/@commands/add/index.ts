import path from 'path';
import { FeatureList } from '@models/feature.interface';
import { deployQuestions } from '@commands/add/deploy_tools/deploy.functions';
// @ts-ignore
import nginxConfig from './deploy_tools/resources/nginx.conf';
// @ts-ignore
import dockerFile from './deploy_tools/resources/Dockerfile';
// @ts-ignore
import componentFile from './component/resources/component.conf';

// Utils
import { create_file, showcase_opts } from '@utils/index';
import { didYouMean } from '@utils/index';
import { componentQuestions } from './component/component.functions';

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

      const deploy_answers = await deployQuestions();

      if (deploy_answers.NGINX_CONF_GENERATE) {
        // Should create nginx config file
        await create_file(deploy_answers.NGINX_CONF_PATH, 'nginx.conf', nginxConfig);
      }

      if (deploy_answers.DOCKER_CONF_GENERATE) {
        // Should create nginx config file
        await create_file(deploy_answers.DOCKER_CONF_PATH, 'Dockerfile', dockerFile);
      }

      return;

    // ADD COMPONENT
    case add_features.component.value:
      const { COMPONENT_PATH, COMPONENT_NAME } = await componentQuestions();

      await create_file(COMPONENT_PATH, COMPONENT_NAME, componentFile);

      console.log('Add component');
      return;
    default:
      didYouMean(feature_name, add_features);
      showcase_opts(add_features);
  }
};
