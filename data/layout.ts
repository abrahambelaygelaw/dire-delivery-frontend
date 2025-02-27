import { ClipboardList, Settings, UserCog, Users } from 'lucide-react';

// Menu items.
export const menuItems = [
  {
    title: 'Employees',
    url: '/admin/employees',
    icon: Users,
  },
  {
    title: 'Admins',
    url: '/admin/admins',
    icon: UserCog,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ClipboardList,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Dashboard',
    url: '/admin',
    icon: '',
  },
];
