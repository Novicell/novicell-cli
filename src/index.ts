import program from 'commander';
import { add, add_opts } from '@commands/add';
import { init } from '@commands/init';

program.version('0.0.1');

program
  .command('add [feature_name]')
  .description('Adds a feature to an existing project')
  .on('--help', add_opts)
  .action(add);

program
  .command('init')
  .description('Initializes SPA for CMS')
  .option('-d, --default', 'Default structure declared by Novicell')
  .action(init);

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
