import React, { memo } from "react";

interface Props {
  title: string;
  properties: Record<string, string>;
  setProperties: (value: React.SetStateAction<Record<string, string> | undefined>) => void;
}

function Component({ title, properties, setProperties }: Props) {
  return (
    <div className="flex flex-col">
      <div className="py-2 text-2 text-white border-b border-gray-300">{title}</div>
      <div className="py-4">
        <div className="flex flex-col gap-4">
          {Object.entries(properties).map(([key]) => {
            return (
              <div key={key} className="flex flex-col gap-2">
                <div className="text-2 font-300 text-white">{key}</div>
                <input
                  value={properties[key]}
                  onChange={(e) => {
                    const newProps = { ...properties };
                    newProps[key] = e.currentTarget.value;
                    setProperties(newProps);
                  }}
                  className={`
                    w-full py-4 px-8 rounded-sm outline-none border-none bg-gray-600 text-1 font-300 text-white
                    placeholder:text-gray-200
                  `}
                  placeholder={"Please enter a valid value."}
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const CurlProperty = memo(Component);
