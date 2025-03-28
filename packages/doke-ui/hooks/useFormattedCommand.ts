import { useEffect, useState } from "react";
import { useExecuteCommand } from "@/contexts";
import { HeaderCredential } from "@/lib/types";

export function useFormattedCommand() {
  const { selected, startCommand, bodyProps, queryProps, paramsProps, headers } = useExecuteCommand();
  const [command, setCommand] = useState("");
  const [formattedBodies, setFormattedBodies] = useState("");
  const [formattedQuerys, setFormattedQuerys] = useState("");
  const [formattedParams, setFormattedParams] = useState("");
  const [formattedHeaders, setFormattedHeaders] = useState("");

  useEffect(() => {
    return () => {
      setFormattedBodies("");
      setFormattedQuerys("");
      setFormattedParams("");
      setFormattedHeaders("");
    };
  }, [selected]);

  useEffect(() => {
    if (!bodyProps) return;
    setFormattedBodies(JSON.stringify(bodyProps, null, 2));
  }, [bodyProps]);

  useEffect(() => {
    if (!paramsProps) return;
    const commands = Object.entries(paramsProps).map(([key, value], index) => {
      if (index === 0) {
        return `/${value}`;
      } else {
        return `/${key}/${value}`;
      }
    });
    setFormattedParams(commands.join(""));
  }, [paramsProps]);

  useEffect(() => {
    if (!queryProps) return;
    const commands = Object.entries(queryProps).map(([key, value], index) => {
      if (index === 0) {
        return `?${key}=${value}`;
      } else {
        return `&${key}=${value}`;
      }
    });
    setFormattedQuerys(commands.join(""));
  }, [queryProps]);

  useEffect(() => {
    if (!headers) return;
    const commands: string[] = [];

    Object.entries(headers).forEach(([key, value]) => {
      if (key === "credentials") {
        const credentials = (value as HeaderCredential[]).map((credential) => {
          return `-H "${credential.key}: ${credential.type === "custom" ? "" : credential.type + " "}${
            credential.value
          }" \\\n`;
        });
        return commands.push(...credentials);
      }

      commands.push(`-H "${key}: ${value}" \\\n`);
    });

    setFormattedHeaders(" \\\n" + commands.join(""));
  }, [headers]);

  useEffect(() => {
    if (!selected) return;

    const totalCommand =
      startCommand +
      formattedParams +
      formattedQuerys +
      formattedHeaders +
      (formattedBodies && `-d '${formattedBodies}'`);

    if (!totalCommand.endsWith("\\\n")) {
      setCommand(totalCommand);
      return;
    }

    setCommand(totalCommand.slice(0, totalCommand.length - 2));
  }, [selected, formattedBodies, formattedParams, formattedQuerys, formattedHeaders]);

  return {
    command,
    formattedQuerys,
    formattedParams,
  };
}
