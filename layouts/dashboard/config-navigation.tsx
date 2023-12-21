import type {ReactNode} from "react";
import {SvgColor} from '@components/svg-color';
import {imagePath} from "@components/utils/image-path";

// ----------------------------------------------------------------------

const icon = (name: string): ReactNode => (
  <SvgColor src={`${imagePath}icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig = [
  {
    title: 'home',
    path: '/en',
    icon: icon('ic_analytics'),
  },
  {
    title: 'courses',
    path: '/en/courses',
    icon: icon('ic_analytics'),
  },
  {
    title: 'results',
    path: '/en/results',
    icon: icon('ic_analytics'),
  },
  {
    title: 'students',
    path: '/en/students',
    icon: icon('ic_analytics'),
  },
  {
    title: 'profile',
    path: '/en/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'settings',
    path: '/en/settings',
    icon: icon('ic_analytics'),
  },
  {
    title: 'logout',
    path: '/api/auth/logout',
    icon: icon('ic_user'),
  },
];
