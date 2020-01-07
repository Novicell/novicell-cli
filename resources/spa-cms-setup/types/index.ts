export * from './state';

export interface Link {
  name?: string;
  url?: string;
}

export interface NavigationItem {
  hasChildren: boolean;
  level: number;
  nodeId: number;
  children: NavigationItem[];
  link: PageLink;
}

export interface PageLink extends Link {
  target?: string;
  url: string;
}

export interface Image {
  url?: string;
  altText?: string;
  title?: string;
  focalPoint?: FocalPoint;
}

export interface FocalPoint {
  top: number;
  left: number;
}

export interface SocialLink extends PageLink {
  icon?: Image;
  type: string;
}

export interface Page {
  meta?: PageMeta; // Only used in application
  seo?: PageSeo; // Used in <head>
  content?: PageContent; // Body
  hero?: any;
}

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  index: string;
  follow: string;
  canonical: string;
}

export interface PageMeta {
  statusCode?: number; // 200, 301, 302, 404
  redirectUrl?: string; // Used with 301, 302
  path?: string; // Used for setting the navigation active - e.g. -1, 2, 203
  template: string; // FrontPage, TextPage ..
  culture: Culture;
}

export interface PageContent {
  grid: any; // depends on CMS
}

export interface Settings {
  siteSettings: SiteSettings;
  siteFooter: SiteFooter;
  siteHeader: SiteHeader;
}

export interface SiteHeader {
  navigation?: PageLink[];
}

export interface SiteFooter {
  navigation?: PageLink[];
  secondaryNavigation?: PageLink[];
}

export interface SiteSettings {
  brand?: Brand;
  segments?: PageLink[];
  legalLinks?: PageLink[];
}

export interface Navigation {
  primary?: NavigationItem[];
  secondary?: PageLink[];
}

export interface Brand {
  logo?: Image;
  logoAlternative?: Image;
}

export interface ImageSize {
  windowWidth?: number;
  imageWidth: number;
  imageHeight?: number;
  queryString?: string;
}

export interface GridRowModel {
  config: any;
  editors: GridEditor[];
}

export interface GridEditor {
  alias: string;
  column: number;
  viewModel: any;
}

export interface Culture {
  lang?: string;
}
