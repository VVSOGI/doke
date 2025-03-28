import React, { memo } from "react";
import { HeaderCredential } from "@/lib/types";

interface Props {
  title: string;
  properties: Record<string, any>;
  setProperties: (value: React.SetStateAction<Record<string, any> | undefined>) => void;
}

function Component({ title, properties, setProperties }: Props) {
  return (
    <div className="flex flex-col">
      <div className="py-2 text-2 text-white border-b border-gray-300">{title}</div>
      <div className="py-4">
        <div className="flex flex-col gap-4">
          {properties.credentials.map((credential: HeaderCredential, index: number) => {
            return (
              <div key={credential.key + credential.type} className="flex flex-col gap-2">
                <div className="text-2 font-300 text-white">
                  {credential.type === "custom" ? credential.key : credential.type}
                </div>
                <input
                  value={credential.value}
                  onChange={(e) => {
                    const newProps = { ...properties };
                    newProps["credentials"][index]["value"] = e.currentTarget.value;
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

export const CurlHeaderProperty = memo(Component);
