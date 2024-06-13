import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import sae from './scenes/sae?scene';
import politics from './scenes/politics?scene';
import social from './scenes/social?scene';
import logistics from './scenes/logistics?scene';
import end from './scenes/end?scene';

export default makeProject({
  scenes: [intro, sae, politics, social, logistics, end],
});
