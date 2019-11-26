import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '~/types';

export const state = (): RootState => ({});

export const mutations: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }: { dispatch: any }, ctx) {
    const path = `${ctx.env.baseUrl}/`;
    const fetchNavigation = dispatch('navigation/FETCH_NAVIGATION', { path }, { root: true });
    const fetchSettings = dispatch('site/FETCH_SETTINGS', { path });
    try {
      await Promise.all([fetchNavigation, fetchSettings]);
    } catch (error) {
      console.error('Error on fetching navigation and settings');
    }
  },
};
