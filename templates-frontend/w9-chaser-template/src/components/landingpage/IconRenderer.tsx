import React from "react";
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

// Combine all icons into one object
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

interface EasyIconProps {
  icon: string; // Just pass the icon name like "FiStar" or "FaRocket"
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({
  icon,
  size = 24,
  color,
  className = "",
}) => {
  // Find the icon component
  const IconComponent = ALL_ICONS[icon as keyof typeof ALL_ICONS] as any;

  if (!IconComponent || typeof IconComponent !== 'function') {
    console.warn(`Icon "${icon}" not found. Using fallback.`);
    return (
      <FiIcons.FiHelpCircle size={size} color={color} className={className} />
    );
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default EasyIcon;
