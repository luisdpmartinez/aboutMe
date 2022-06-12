import { boot } from 'quasar/wrappers';
import MasonryWall from '@yeger/vue-masonry-wall';

export default boot(async ({ app }) => {
  app.use(MasonryWall);
});
