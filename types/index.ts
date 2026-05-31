export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface User {
  name: string;
  streak: number;
  avatar?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export type ActivityDay = {
  date: string;
  count: number;
};
