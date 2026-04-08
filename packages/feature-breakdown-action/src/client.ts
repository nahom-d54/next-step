import {
  BreakdownActionClientConfig,
  BreakdownActionRequest,
  BreakdownActionResponse,
} from "./types.js";

const DEFAULT_ENDPOINT = "/api/breakdown-action";

export class BreakdownActionApiClient {
  private readonly baseUrl: string;
  private readonly endpoint: string;
  private readonly token: string | undefined;
  private readonly fetchFn: typeof fetch;

  constructor(config: BreakdownActionClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.endpoint = config.endpoint ?? DEFAULT_ENDPOINT;
    this.token = config.token;
    this.fetchFn = config.fetchFn ?? fetch;
  }

  async generateBreakdown(
    payload: BreakdownActionRequest,
  ): Promise<BreakdownActionResponse> {
    const response = await this.fetchFn(`${this.baseUrl}${this.endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.token ? { authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Breakdown action API request failed with status ${response.status}`,
      );
    }

    return (await response.json()) as BreakdownActionResponse;
  }
}
