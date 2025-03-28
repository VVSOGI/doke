import { useExecuteCommand } from "@/contexts";
import { useFormattedCommand } from "@/hooks";
import { HeaderCredential, POSTRequestDefault } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export function useApiExecute() {
  const { selected, bodyProps, headers, getFormattedUrl } = useExecuteCommand();
  const { formattedParams, formattedQuerys } = useFormattedCommand();
  const [responseData, setResponseData] = useState<Record<string, any> | Record<string, any>[] | undefined>();

  const onClickExecute = useCallback(async () => {
    if (!selected) return;

    const formattedHeader: Record<string, string> = {};

    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        if (key === "credentials") {
          (value as HeaderCredential[]).forEach((credential) => {
            formattedHeader[credential.key] = `${credential.type} ${credential.value}`;
          });
          return;
        }

        formattedHeader[key] = value;
      });
    }

    const defaultBody: POSTRequestDefault = {
      serverUrl: getFormattedUrl(selected),
      method: selected.method,
      headers: formattedHeader,
      params: formattedParams,
      query: formattedQuerys,
      body: bodyProps,
    };

    const response = await fetch(`http://localhost:3001/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultBody),
    });

    setResponseData(await response.json());
  }, [selected, formattedParams, formattedQuerys, bodyProps]);

  useEffect(() => {
    return () => {
      setResponseData(undefined);
    };
  }, [selected]);

  return {
    responseData,
    onClickExecute,
  };
}
