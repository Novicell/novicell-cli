import program from 'commander';
import { add, add_features } from '@commands/add';
import { init } from '@commands/init';
import { showcase_opts, didYouMean } from '@utils/index';
import { FeatureList } from '@models/feature.interface.js';

program.version('x.x.x');

export const root_commands: FeatureList = {
  add: { value: 'add', description: 'Adds a feature to an existing project' },
  init: { value: 'init', description: 'Initializes SPA for CMS (init --help)' },
};

const user_attempt_input = process.argv.slice(2)[0];
const can_find_command = Object.keys(root_commands).some(x => x == process.argv.slice(2)[0]);
if (!can_find_command) didYouMean(user_attempt_input, root_commands);

program
  .command(`${root_commands.add.value} [feature_name]`)
  .description(root_commands.add.description)
  .on('--help', () => showcase_opts(add_features))
  .action(add);

program
  .command(root_commands.init.value)
  .description(root_commands.init.description)
  .option('-d, --default', 'Default structure declared by Novicell')
  .option('-m, --manual', 'Setup nuxt settings manually')
  .option('-t, --test', 'ONLY for testing. Mounts Novicell default SPA on newest Nuxt app')
  .action(init);

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}
