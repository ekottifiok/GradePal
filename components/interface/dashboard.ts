import type {ReactNode} from "react";

export enum ViewPermissionEnum {
  Staff = 'Staff',
  Student = 'Student'
}

export interface NavConfig {
  title: string;
  path: string;
  icon: ReactNode;
  viewPermission?: ViewPermissionEnum;
}