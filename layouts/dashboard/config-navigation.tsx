import type {ReactNode} from "react";
import {SvgColor} from '@components/svg-color';
import {IMAGE_PATH} from "@components/constants";
import type {NavConfig} from "@components/interface";
import {ViewPermissionEnum} from "@components/interface/dashboard";

const icon = (name: string): ReactNode => (
  <SvgColor src={IMAGE_PATH.concat(`icons/navbar/${name}.svg`)} sx={{width: 1, height: 1}}/>
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
    viewPermission: ViewPermissionEnum.Staff
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
    viewPermission: ViewPermissionEnum.Staff
  },
  {
    title: 'profile',
    path: '/en/profile',
    icon: icon('ic_user'),
    viewPermission: ViewPermissionEnum.Student
  },
  {
    title: 'settings',
    path: '/en/settings',
    icon: icon('ic_settings'),
  },
];
