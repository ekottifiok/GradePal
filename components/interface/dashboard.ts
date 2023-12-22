import type {ReactNode} from "react";

export interface NavConfig {
  title: string,
  path: string,
  icon: ReactNode,
  viewPermission?: 'Staff' | 'Student'
}