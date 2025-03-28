import fs from "fs/promises";
import path from "path";
import { Controller, Project } from "@/lib/types";

export async function loadApiSchema(name: string) {
  const jsonPath = path.join(process.cwd(), "api-docs", "routes", `${name}.json`);
  const response = await fs.readFile(jsonPath, "utf-8");
  const data: Controller = JSON.parse(response);

  return data;
}

export async function loadProjectData() {
  const jsonPath = path.join(process.cwd(), "api-docs", "projects.json");
  const response = await fs.readFile(jsonPath, "utf-8");
  const data: Project = JSON.parse(response);

  return data;
}
