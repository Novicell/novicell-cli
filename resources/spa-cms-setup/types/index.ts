export * from './state';

export interface ILink {
  name?: string;
  url?: string;
}

export interface INavigationItem {
  hasChildren: boolean;
  level: number;
  nodeId: number;
  children: INavigationItem[];
  link: IPageLink;
}

export interface IPageLink extends ILink {
  target?: string;
  url: string;
}

export interface IImage {
  url?: string;
  altText?: string;
  title?: string;
  focalPoint?: IFocalPoint;
}

export interface IFocalPoint {
  top: number;
  left: number;
}

export interface ISocialLink extends IPageLink {
  icon?: IImage;
  type: string;
}

export interface IPage {
  meta?: IPageMeta; // Only used in application
  seo?: IPageSeo; // Used in <head>
  content?: IPageContent; // Body
  hero?: any;
}

export interface IPageSeo {
  title: string;
  description: string;
  keywords: string;
  index: string;
  follow: string;
  canonical: string;
}

export interface IPageMeta {
  statusCode?: number; // 200, 301, 302, 404
  redirectUrl?: string; // Used with 301, 302
  path?: string; // Used for setting the navigation active - e.g. -1, 2, 203
  template: string; // FrontPage, TextPage ..
  culture: ICulture;
}

export interface IPageContent {
  grid: any; // depends on CMS
}

export interface ISettings {
  siteSettings: ISiteSettings;
  siteFooter: ISiteFooter;
  siteHeader: ISiteHeader;
}

export interface ISiteHeader {
  navigation?: IPageLink[];
}

export interface ISiteFooter {
  navigation?: IPageLink[];
  secondaryNavigation?: IPageLink[];
}

export interface ISiteSettings {
  brand?: IBrand;
  segments?: IPageLink[];
  legalLinks?: IPageLink[];
}

export interface INavigation {
  primary?: INavigationItem[];
  secondary?: IPageLink[];
}

export interface IBrand {
  logo?: IImage;
  logoAlternative?: IImage;
}

export interface IImageSize {
  windowWidth?: number;
  imageWidth: number;
  imageHeight?: number;
  queryString?: string;
}

export interface IGridRowModel {
  config: any;
  editors: IGridEditor[];
}

export interface IGridEditor {
  alias: string;
  column: number;
  viewModel: any;
}

export interface ICulture {
  lang?: string;
}
