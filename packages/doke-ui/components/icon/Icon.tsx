import { memo } from "react";
import { ICONS_LIST } from "@/lib/constants";

interface props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  size?: string;
  icons: ICONS_LIST;
}

function Component({ size = "20px", icons, className, ...props }: props) {
  return (
    <span
      className={`
        material-symbols-outlined
        ${className}
      `}
      style={{
        fontSize: size,
      }}
      {...props}
    >
      {icons}
    </span>
  );
}

/**
 * @size Just enter the size you want in px.
 * @icons You can call ICONS_LIST in /constants to select the available icons.
 */
export const Icon = memo(Component);
