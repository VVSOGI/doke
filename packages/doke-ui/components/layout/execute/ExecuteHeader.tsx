import React, { memo } from "react";
import { Icon } from "@/components";
import { ICONS_LIST } from "@/lib/constants";

interface Props {
  onClick: () => void;
}

function Component({ onClick }: Props) {
  return (
    <div className="w-full text-end p-7 pb-0">
      <Icon
        className={`
          text-gray-100 cursor-pointer select-none
          hover:text-gray-400
          active:text-gray-200
        `}
        size="30px"
        icons={ICONS_LIST.CLOSE}
        onClick={onClick}
      />
    </div>
  );
}

export const ExecuteHeader = memo(Component);
