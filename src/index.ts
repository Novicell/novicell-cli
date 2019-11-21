import program from 'commander';
import { add, add_opts } from '@commands/add';

program.version('0.0.1');

program
  .command('add [feature_name]')
  .description('Adds a feature to an existing project')
  .on('--help', add_opts)
  .action(add);

program
  .command('init')
  .description('Initializes SPA for CMS')
  .option('-d, --default', 'Default structure declared by Novicell');

// Generates default files for a Nuxt SSR setup
program.parse(process.argv);
