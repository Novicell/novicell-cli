export default ($axios: any) => ({
  getContentByUrl(path: string): any {
    return $axios('/api/content', {
      method: 'get',
      params: {
        url: path,
      },
    });
  },

  getNavigation(path: string, levels = 1): any {
    return $axios('/api/navigation', {
      method: 'get',
      params: {
        url: path,
        levels,
      },
    });
  },

  getSettings(path: string): any {
    return $axios('/api/settings', {
      method: 'get',
      params: {
        url: path,
      },
    });
  },
});
