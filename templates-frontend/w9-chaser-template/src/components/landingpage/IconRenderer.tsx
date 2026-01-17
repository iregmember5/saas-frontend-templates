import React from "react";
import { FiHelpCircle } from "react-icons/fi";

const iconLoader = (icon: string): Promise<any> => {
  const prefix = icon.substring(0, 2);
  const iconMap: Record<string, () => Promise<any>> = {
    Fi: () => import("react-icons/fi").then(m => m[icon as keyof typeof m]),
    Fa: () => import("react-icons/fa").then(m => m[icon as keyof typeof m]),
    Md: () => import("react-icons/md").then(m => m[icon as keyof typeof m]),
    Hi: () => import("react-icons/hi").then(m => m[icon as keyof typeof m]),
    Io: () => import("react-icons/io5").then(m => m[icon as keyof typeof m]),
    Ai: () => import("react-icons/ai").then(m => m[icon as keyof typeof m]),
    Bi: () => import("react-icons/bi").then(m => m[icon as keyof typeof m]),
    Bs: () => import("react-icons/bs").then(m => m[icon as keyof typeof m]),
    Cg: () => import("react-icons/cg").then(m => m[icon as keyof typeof m]),
    Gi: () => import("react-icons/gi").then(m => m[icon as keyof typeof m]),
    Gr: () => import("react-icons/gr").then(m => m[icon as keyof typeof m]),
    Ri: () => import("react-icons/ri").then(m => m[icon as keyof typeof m]),
    Si: () => import("react-icons/si").then(m => m[icon as keyof typeof m]),
    Tb: () => import("react-icons/tb").then(m => m[icon as keyof typeof m]),
    Ti: () => import("react-icons/ti").then(m => m[icon as keyof typeof m]),
    Lu: () => import("lucide-react").then(m => m[icon as keyof typeof m]),
  };
  return iconMap[prefix]?.() || Promise.resolve(null);
};

interface EasyIconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({ icon, size = 24, color, className = "" }) => {
  const [IconComponent, setIconComponent] = React.useState<any>(null);

  React.useEffect(() => {
    iconLoader(icon).then(setIconComponent).catch(() => setIconComponent(null));
  }, [icon]);

  if (!IconComponent) {
    return <FiHelpCircle size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default EasyIcon;
