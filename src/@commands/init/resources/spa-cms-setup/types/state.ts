import { NavigationItem, SiteHeader, SiteFooter, SiteSettings } from '.';

export interface RootState {}

export interface NavigationState {
  primary: NavigationItem[];
  secondary: NavigationItem[];
  path: string;
  isOpen: boolean;
}

export interface SiteState {
  settings?: SiteSettings;
  header?: SiteHeader;
  footer?: SiteFooter;
}
