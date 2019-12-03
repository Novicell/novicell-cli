import { FeatureList } from '@models/feature.interface';
import { didYouMean } from '@utils/index';
import { initQuestions, goWithDefault, goWithManual, setUpNuxtForTesting } from './functionality/init.functions';

export const init = async (opts: any) => {
  if (opts.test) {
    // if -t, --test flag is provided
    setUpNuxtForTesting();
  } else if (opts.default) {
    // if -d, --default flag is provided
    goWithDefault();
  } else {
    const { WHICH_ROUTE } = await initQuestions();

    switch (WHICH_ROUTE) {
      case 'Default setup':
        goWithDefault();
        break;
      case 'Manual setup':
        goWithManual();
        break;
    }
  }
};
