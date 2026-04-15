export interface BreakdownActionRequest {
  task: string;
  context?: string;
  maxItems?: number;
}

export interface BreakdownActionItem {
  title: string;
  description: string;
}

export interface BreakdownTreeItem extends BreakdownActionItem {
  id?: string;
  children?: BreakdownTreeItem[];
}

export interface BreakdownActionResponse {
  items: BreakdownActionItem[];
}

export interface BreakdownActionClientConfig {
  /**
   * API base URL (e.g. http://localhost:3000)
   */
  baseUrl: string;
  /**
   * Relative route path to the breakdown endpoint.
   * Defaults to /api/breakdown-action.
   */
  endpoint?: string;
  /**
   * Optional API token used as Bearer authorization.
   */
  token?: string;
  /**
   * Optional fetch implementation for testing or custom runtimes.
   */
  fetchFn?: typeof fetch;
}
