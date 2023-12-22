import type {ReactNode} from "react";
import {SvgColor} from '@components/svg-color';
import {imagePath} from "@components/utils";
import type {NavConfig} from "@components/interface";

// ----------------------------------------------------------------------

const icon = (name: string): ReactNode => (
  <SvgColor src={`${imagePath}icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig: NavConfig[] = [
  {
    title: 'home',
    path: '/en',
    icon: icon('ic_home'),
  },
  {
    title: 'courses',
    path: '/en/courses',
    icon: icon('ic_courses'),
    viewPermission: 'Staff'
  },
  {
    title: 'results',
    path: '/en/results',
    icon: icon('ic_results'),
  },
  {
    title: 'students',
    path: '/en/students',
    icon: icon('ic_students'),
    viewPermission: 'Staff'
  },
  {
    title: 'profile',
    path: '/en/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'settings',
    path: '/en/settings',
    icon: icon('ic_settings'),
  },
];
