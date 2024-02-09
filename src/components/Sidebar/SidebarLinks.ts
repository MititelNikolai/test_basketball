import IconsPeoples from "../../ui/icons/IconsPeoples";
import IconPerson from "../../ui/icons/IconPerson";
import { FC } from "react";
import ISvgIconProps from "../../ui/icons/ISvgIconProps";
interface ILink {
  id: number;
  label: string;
  icon: FC<ISvgIconProps>;
  link: string;
}

export const links: ReadonlyArray<ILink> = [
  {
    id: 1,
    label: "Teams",
    icon: IconsPeoples,
    link: "teams",
  },
  {
    id: 2,
    label: "Players",
    icon: IconPerson,
    link: "players",
  },
];
