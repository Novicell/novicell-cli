import program from 'commander';
import { add, add_features } from '@commands/add';
import { init } from '@commands/init';
import { showcase_opts } from '@utils/index';

program.version('0.1.X');

program
  .command('add [feature_name]')
  .description('Adds a feature to an existing project')
  .on('--help', () => showcase_opts(add_features))
  .action(add);

program
  .command('init')
  .description('Initializes SPA for CMS (init --help)')
  .option('-d, --default', 'Default structure declared by Novicell')
  .action(init);

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
