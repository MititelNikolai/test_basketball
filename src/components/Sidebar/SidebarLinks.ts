import { FC } from "react";
import { IconPeoples, IconPerson } from "../ui/icons";
import { SvgIconProps } from "../ui/icons/SvgIconProps";

export const links: ReadonlyArray<{
  id: number;
  label: string;
  icon: FC<SvgIconProps>;
  link: string;
}> = [
  {
    id: 1,
    label: "Teams",
    icon: IconPeoples,
    link: "teams",
  },
  {
    id: 2,
    label: "Players",
    icon: IconPerson,
    link: "players",
  },
];
