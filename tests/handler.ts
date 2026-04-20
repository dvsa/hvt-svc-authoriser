import { APIGatewayEvent } from "aws-lambda";

/**
 * Lambda to call to test the authoriser.
 * @returns - Promise<string>
 * @param _event
 */
export const test = async (_event: APIGatewayEvent): Promise<string> => {
  return "Test function successfully invoked. Access was granted.";
};
