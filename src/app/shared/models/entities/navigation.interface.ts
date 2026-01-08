export interface Navigation {
  id: string;
  label: string;
  icon: string;
  route: string;
  order: number;
  visible: boolean;
  permissions?: string[];
}
