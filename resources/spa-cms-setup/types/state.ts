import { INavigationItem, ISiteHeader, ISiteFooter, ISiteSettings } from '.';

export interface IRootState {}

export interface INavigationState {
  primary: INavigationItem[];
  secondary: INavigationItem[];
  path: string;
  isOpen: boolean;
}

export interface ISiteState {
  settings?: ISiteSettings;
  header?: ISiteHeader;
  footer?: ISiteFooter;
}
