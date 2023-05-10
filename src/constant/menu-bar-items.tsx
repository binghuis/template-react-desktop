import Icon from '@/components/icon';
import { MenuBarProps } from '@/components/menu-bar';

export const MenuBarItems: MenuBarProps['items'] = [
  {
    label: 'dashboard',
    path: '/',
    icon: <Icon type='dashboard' />,
  },
  {
    label: 'Demo',
    path: '/demo',
    icon: <Icon type='dashboard' />,
  },
];