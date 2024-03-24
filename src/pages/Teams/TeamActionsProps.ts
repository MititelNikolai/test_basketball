export interface TeamActionsProps {
  filter: (search: string) => void;
  resetAction: () => void;
  inSearch: boolean;
}
