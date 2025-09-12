export interface SubMenuItem {
  Header: string;
  path: string;
  subNavValue: string;
}

export interface ProductsMenuItem {
  id: number;
  Header: string;
  subMenu: SubMenuItem[];
  links: string;
  overview?: string;
}
