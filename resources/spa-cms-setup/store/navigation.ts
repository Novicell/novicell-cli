import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { INavigationState, IRootState, INavigation, INavigationItem } from '~/types';

export const state = (): INavigationState => ({
  primary: [],
  secondary: [],
  path: '',
  isOpen: false,
});

export const mutations: MutationTree<INavigationState> = {
  setPrimaryItems(state: INavigationState, items: INavigationItem[]): void {
    state.primary = items;
  },
  setSecondaryItems(state: INavigationState, items: INavigationItem[]): void {
    state.secondary = items;
  },
  setPath(state: INavigationState, path: string): void {
    state.path = path;
  },
  open(state: INavigationState): void {
    state.isOpen = true;
  },
  close(state: INavigationState): void {
    state.isOpen = false;
  },
};

export const getters: GetterTree<INavigationState, IRootState> = {
  getPrimaryItems(state: INavigationState): any[] {
    return state.primary || [];
  },
  getSecondaryItems(state: INavigationState): any[] {
    return state.secondary || [];
  },
  getPath(state: INavigationState): string {
    return state.path;
  },
  isOpen(state: INavigationState): boolean {
    return state.isOpen;
  },
};

export const actions: ActionTree<INavigationState, IRootState> = {
  SET_PATH({ commit }: { commit: any }, { path }: { path: string }) {
    commit('setPath', path);
  },

  async FETCH_NAVIGATION({ commit }: { commit: any }, { path }: { path: string }) {
    const { data }: { data: INavigation } = await (this as any).$contentApi.getNavigation(path, 3);
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
