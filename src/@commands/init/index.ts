import { FeatureList } from '@models/feature.interface';
import { didYouMean } from '@utils/index';
import { goWithDefault, goWithManual, setUpNuxtForTesting } from './functionality/init.functions';
import { initQuestions } from './functionality/init.questions';

export const init = async (opts: any) => {
  if (opts.test) {
    setUpNuxtForTesting();
    // if -t, --test flag is provided
  } else if (opts.default) {
    goWithDefault();
  } else if (opts.manual) {
    goWithManual();
  } else {
    // If no flags are given
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
