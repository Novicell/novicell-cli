import { MutationTree, ActionTree } from 'vuex';
import { IRootState } from '~/types';

export const state = (): IRootState => ({});

export const mutations: MutationTree<IRootState> = {};

export const actions: ActionTree<IRootState, IRootState> = {
  async nuxtServerInit({ dispatch }: { dispatch: any }, ctx) {
    const path = `${ctx.env.baseUrl}/`;
    console.log(path);
    const fetchNavigation = dispatch('navigation/FETCH_NAVIGATION', { path }, { root: true });
    const fetchSettings = dispatch('site/FETCH_SETTINGS', { path });
    try {
      await Promise.all([fetchNavigation, fetchSettings]);
    } catch (error) {
      console.error('Error on fetching navigation and settings');
    }
  },
};
