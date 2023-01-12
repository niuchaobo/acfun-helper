import { OutputBundle, OutputChunk } from "rollup";
import slash from "slash";

export function removeFileExtension(filePath: string) {
  const index = filePath.lastIndexOf(".");
  return index > -1 ? filePath.substring(0, index) : filePath;
}

export function findChunkByName(
  name: string,
  bundle: OutputBundle
): OutputChunk | undefined {
  return Object.values(bundle).find(
    (b) => b.name && slash(b.name) === slash(name) && b.type === "chunk"
  ) as OutputChunk | undefined;
}
