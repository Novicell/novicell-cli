import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { I_NavigationState, I_RootState, I_Navigation, I_NavigationItem } from '~/types';

export const state = (): I_NavigationState => ({
  primary: [],
  secondary: [],
  path: '',
  isOpen: false,
});

export const mutations: MutationTree<I_NavigationState> = {
  setPrimaryItems(state: I_NavigationState, items: I_NavigationItem[]): void {
    state.primary = items;
  },
  setSecondaryItems(state: I_NavigationState, items: I_NavigationItem[]): void {
    state.secondary = items;
  },
  setPath(state: I_NavigationState, path: string): void {
    state.path = path;
  },
  open(state: I_NavigationState): void {
    state.isOpen = true;
  },
  close(state: I_NavigationState): void {
    state.isOpen = false;
  },
};

export const getters: GetterTree<I_NavigationState, I_RootState> = {
  getPrimaryItems(state: I_NavigationState): any[] {
    return state.primary || [];
  },
  getSecondaryItems(state: I_NavigationState): any[] {
    return state.secondary || [];
  },
  getPath(state: I_NavigationState): string {
    return state.path;
  },
  isOpen(state: I_NavigationState): boolean {
    return state.isOpen;
  },
};

export const actions: ActionTree<I_NavigationState, I_RootState> = {
  SET_PATH({ commit }: { commit: any }, { path }: { path: string }) {
    commit('setPath', path);
  },

  async FETCH_NAVIGATION({ commit }: { commit: any }, { path }: { path: string }) {
    const { data }: { data: I_Navigation } = await (this as any).$contentApi.getNavigation(path, 3);
    commit('setPrimaryItems', data.primary);
    commit('setSecondaryItems', data.secondary);
  },

  TOGGLE_MOBILE_NAVIGATION({ commit, getters }: { commit: any; getters: any }) {
    if (getters.isOpen) {
      commit('close');
      return;
    }
    commit('open');
  },

  CLOSE_MOBILE_NAVIGATION({ commit }: { commit: any }) {
    commit('close');
  },
};
