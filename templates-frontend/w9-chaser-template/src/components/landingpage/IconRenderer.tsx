import React from "react";
import * as FiIcons from "react-icons/fi";

interface EasyIconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

const EasyIcon: React.FC<EasyIconProps> = ({ icon, size = 24, color, className = "" }) => {
  const IconComponent = FiIcons[icon as keyof typeof FiIcons] as any;

  if (!IconComponent) {
    return <FiIcons.FiHelpCircle size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default EasyIcon;
