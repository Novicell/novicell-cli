export * from './state';

export interface I_Link {
  name?: string;
  url?: string;
}

export interface I_NavigationItem {
  hasChildren: boolean;
  level: number;
  nodeId: number;
  children: I_NavigationItem[];
  link: I_PageLink;
}

export interface I_PageLink extends I_Link {
  target?: string;
  url: string;
}

export interface I_Image {
  url?: string;
  altText?: string;
  title?: string;
  focalPoint?: I_FocalPoint;
}

export interface I_FocalPoint {
  top: number;
  left: number;
}

export interface I_SocialLink extends I_PageLink {
  icon?: I_Image;
  type: string;
}

export interface I_Page {
  meta?: I_PageMeta; // Only used in application
  seo?: I_PageSeo; // Used in <head>
  content?: I_PageContent; // Body
  hero?: any;
}

export interface I_PageSeo {
  title: string;
  description: string;
  keywords: string;
  index: string;
  follow: string;
  canonical: string;
}

export interface I_PageMeta {
  statusCode?: number; // 200, 301, 302, 404
  redirectUrl?: string; // Used with 301, 302
  path?: string; // Used for setting the navigation active - e.g. -1, 2, 203
  template: string; // FrontPage, TextPage ..
  culture: I_Culture;
}

export interface I_PageContent {
  grid: any; // depends on CMS
}

export interface I_Settings {
  siteSettings: I_SiteSettings;
  siteFooter: I_SiteFooter;
  siteHeader: I_SiteHeader;
}

export interface I_SiteHeader {
  navigation?: I_PageLink[];
}

export interface I_SiteFooter {
  navigation?: I_PageLink[];
  secondaryNavigation?: I_PageLink[];
}

export interface I_SiteSettings {
  brand?: I_Brand;
  segments?: I_PageLink[];
  legalLinks?: I_PageLink[];
}

export interface I_Navigation {
  primary?: I_NavigationItem[];
  secondary?: I_PageLink[];
}

export interface I_Brand {
  logo?: I_Image;
  logoAlternative?: I_Image;
}

export interface I_ImageSize {
  windowWidth?: number;
  imageWidth: number;
  imageHeight?: number;
  queryString?: string;
}

export interface I_GridRowModel {
  config: any;
  editors: I_GridEditor[];
}

export interface I_GridEditor {
  alias: string;
  column: number;
  viewModel: any;
}

export interface I_Culture {
  lang?: string;
}
