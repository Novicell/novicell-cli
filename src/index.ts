import program from 'commander';
import { add, add_features } from '@commands/add';
import { init } from '@commands/init';
import { showcase_opts } from '@utils/index';
import { version } from '../package.json';

program.version(version);

program
  .command('add [feature_name]')
  .description('Adds a feature to an existing project')
  .on('--help', () => showcase_opts(add_features))
  .action(add);

program
  .command('init')
  .description('Initializes SPA for CMS (init --help)')
  .option('-d, --default', 'Default structure declared by Novicell')
  .option('-t, --test', 'ONLY for testing. Mounts Novicell default SPA on newest Nuxt app')
  .action(init);

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
