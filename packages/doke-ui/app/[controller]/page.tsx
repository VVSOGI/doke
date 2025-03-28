import { ControllerPanel } from "@/components";
import { loadApiSchema, loadProjectData } from "@/lib/utils/load";

export default async function Page({ params }: { params: Promise<{ controller: string }> }) {
  const { controller } = await params;
  const projectData = await loadProjectData();
  const controllerData = await loadApiSchema(controller);

  return (
    <div>
      <ControllerPanel projectData={projectData} controllerData={controllerData} />
    </div>
  );
}
