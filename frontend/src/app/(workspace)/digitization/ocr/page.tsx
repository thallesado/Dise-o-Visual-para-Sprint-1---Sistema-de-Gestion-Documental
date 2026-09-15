"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { OcrView } from "@/features/digitization/ocr-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Digitalización" subcategory="Procesamiento OCR" onAction={notify}>
      <OcrView subcategory="Procesamiento OCR" onAction={notify} />
    </ModulePage>
  );
}
