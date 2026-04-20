export function toAllVerbsAndAllResources(methodArn: string): string {
  const parts = methodArn?.split("/");

  if (!parts || parts.length < 2) {
    throw new Error(`Failed to extract arnBase and stageName from methodArn: "${methodArn}"`);
  }

  const arnBase = parts[0];
  const stageName = parts[1];
  const httpVerb = "*";
  const resourcePath = "*";

  return `${arnBase}/${stageName}/${httpVerb}/${resourcePath}`;
}
