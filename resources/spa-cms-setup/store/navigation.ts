import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { NavigationState, RootState, Navigation, NavigationItem } from '~/types';

export const state = (): NavigationState => ({
  primary: [],
  secondary: [],
  path: '',
  isOpen: false,
});

export const mutations: MutationTree<NavigationState> = {
  setPrimaryItems(state: NavigationState, items: NavigationItem[]): void {
    state.primary = items;
  },
  setSecondaryItems(state: NavigationState, items: NavigationItem[]): void {
    state.secondary = items;
  },
  setPath(state: NavigationState, path: string): void {
    state.path = path;
  },
  open(state: NavigationState): void {
    state.isOpen = true;
  },
  close(state: NavigationState): void {
    state.isOpen = false;
  },
};

export const getters: GetterTree<NavigationState, RootState> = {
  getPrimaryItems(state: NavigationState): any[] {
    return state.primary || [];
  },
  getSecondaryItems(state: NavigationState): any[] {
    return state.secondary || [];
  },
  getPath(state: NavigationState): string {
    return state.path;
  },
  isOpen(state: NavigationState): boolean {
    return state.isOpen;
  },
};

export const actions: ActionTree<NavigationState, RootState> = {
  SET_PATH({ commit }: { commit: any }, { path }: { path: string }) {
    commit('setPath', path);
  },

  async FETCH_NAVIGATION({ commit }: { commit: any }, { path }: { path: string }) {
    const { data }: { data: Navigation } = await (this as any).$contentApi.getNavigation(path, 3);
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
