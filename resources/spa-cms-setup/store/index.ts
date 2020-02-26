import { MutationTree, ActionTree } from 'vuex';
import { I_RootState } from '~/types';

export const state = (): I_RootState => ({});

export const mutations: MutationTree<I_RootState> = {};

export const actions: ActionTree<I_RootState, I_RootState> = {
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
