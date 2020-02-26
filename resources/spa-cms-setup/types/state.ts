import { I_NavigationItem, I_SiteHeader, I_SiteFooter, I_SiteSettings } from '.';

export interface I_RootState {}

export interface I_NavigationState {
  primary: I_NavigationItem[];
  secondary: I_NavigationItem[];
  path: string;
  isOpen: boolean;
}

export interface I_SiteState {
  settings?: I_SiteSettings;
  header?: I_SiteHeader;
  footer?: I_SiteFooter;
}
