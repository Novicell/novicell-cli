import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { IRootState, ISiteState, ISiteHeader, ISiteFooter, ISettings, ISiteSettings } from '~/types';

export const state = (): ISiteState => ({
  footer: {},
  header: {},
  settings: {},
});

export const mutations: MutationTree<ISiteState> = {
  setHeader(state: ISiteState, header: ISiteHeader): void {
    state.header = header;
  },
  setFooter(state: ISiteState, footer: ISiteFooter): void {
    state.footer = footer;
  },
  setSettings(state: ISiteState, settings: ISiteSettings): void {
    state.settings = settings;
  },
};

export const getters: GetterTree<ISiteState, IRootState> = {
  getFooter(state: ISiteState) {
    return state.footer;
  },
  getHeader(state: ISiteState) {
    return state.header;
  },
  getSegments(state: ISiteState) {
    return state.settings ? state.settings.segments : [];
  },
  getLegalLinks(state: ISiteState) {
    return state.settings ? state.settings.legalLinks : [];
  },
};

export const actions: ActionTree<ISiteState, IRootState> = {
  async FETCH_SETTINGS({ commit }: { commit: any }, { path }: { path: string }) {
    try {
      const { data }: { data: ISettings } = await (this as any).$contentApi.getSettings(path);
      commit('setFooter', data.siteFooter);
      commit('setHeader', data.siteHeader);
      commit('setSettings', data.siteSettings);
    } catch (error) {
      console.error('Error on fetching settings');
    }
  },
};
