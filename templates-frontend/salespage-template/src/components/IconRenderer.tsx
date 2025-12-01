import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";
import * as LuIcons from "lucide-react";

const ALL_ICONS: Record<string, any> = {
  ...FiIcons,
  ...FaIcons,
  ...MdIcons,
  ...HiIcons,
  ...IoIcons,
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...CgIcons,
  ...GiIcons,
  ...GrIcons,
  ...RiIcons,
  ...SiIcons,
  ...TbIcons,
  ...TiIcons,
  ...LuIcons,
};

interface IconRendererProps {
  iconPath: string;
  className?: string;
}

export default function IconRenderer({
  iconPath,
  className = "",
}: IconRendererProps) {
  if (!iconPath) return null;

  const [_, iconName] = iconPath.split("/");
  const IconComponent = ALL_ICONS[iconName];

  if (!IconComponent || typeof IconComponent !== "function") {
    return null;
  }

  return <IconComponent className={className} />;
}
