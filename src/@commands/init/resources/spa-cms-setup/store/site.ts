import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { RootState, SiteState, SiteHeader, SiteFooter, Settings, SiteSettings } from '~/types';

export const state = (): SiteState => ({
  footer: {},
  header: {},
  settings: {},
});

export const mutations: MutationTree<SiteState> = {
  setHeader(state: SiteState, header: SiteHeader): void {
    state.header = header;
  },
  setFooter(state: SiteState, footer: SiteFooter): void {
    state.footer = footer;
  },
  setSettings(state: SiteState, settings: SiteSettings): void {
    state.settings = settings;
  },
};

export const getters: GetterTree<SiteState, RootState> = {
  getFooter(state: SiteState) {
    return state.footer;
  },
  getHeader(state: SiteState) {
    return state.header;
  },
  getSegments(state: SiteState) {
    return state.settings ? state.settings.segments : [];
  },
  getLegalLinks(state: SiteState) {
    return state.settings ? state.settings.legalLinks : [];
  },
};

export const actions: ActionTree<SiteState, RootState> = {
  async FETCH_SETTINGS({ commit }: { commit: any }, { path }: { path: string }) {
    try {
      const { data }: { data: Settings } = await (this as any).$contentApi.getSettings(path);
      commit('setFooter', data.siteFooter);
      commit('setHeader', data.siteHeader);
      commit('setSettings', data.siteSettings);
    } catch (error) {
      console.error('Error on fetching settings');
    }
  },
};
