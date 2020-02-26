import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { I_RootState, I_SiteState, I_SiteHeader, I_SiteFooter, I_Settings, I_SiteSettings } from '~/types';

export const state = (): I_SiteState => ({
  footer: {},
  header: {},
  settings: {},
});

export const mutations: MutationTree<I_SiteState> = {
  setHeader(state: I_SiteState, header: I_SiteHeader): void {
    state.header = header;
  },
  setFooter(state: I_SiteState, footer: I_SiteFooter): void {
    state.footer = footer;
  },
  setSettings(state: I_SiteState, settings: I_SiteSettings): void {
    state.settings = settings;
  },
};

export const getters: GetterTree<I_SiteState, I_RootState> = {
  getFooter(state: I_SiteState) {
    return state.footer;
  },
  getHeader(state: I_SiteState) {
    return state.header;
  },
  getSegments(state: I_SiteState) {
    return state.settings ? state.settings.segments : [];
  },
  getLegalLinks(state: I_SiteState) {
    return state.settings ? state.settings.legalLinks : [];
  },
};

export const actions: ActionTree<I_SiteState, I_RootState> = {
  async FETCH_SETTINGS({ commit }: { commit: any }, { path }: { path: string }) {
    try {
      const { data }: { data: I_Settings } = await (this as any).$contentApi.getSettings(path);
      commit('setFooter', data.siteFooter);
      commit('setHeader', data.siteHeader);
      commit('setSettings', data.siteSettings);
    } catch (error) {
      console.error('Error on fetching settings');
    }
  },
};
