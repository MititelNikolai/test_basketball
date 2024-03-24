export interface BreadcrumbsProps {
  pathname: string;
  actions?: boolean;
  id?: number;
  deleteAction?: any;
  editAction?: () => void;
  successAction?: any;
  success?: boolean;
  needBorder?: boolean;
}
