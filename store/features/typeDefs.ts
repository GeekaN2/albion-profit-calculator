/**
 * Describe state of features module
 */
export interface FeaturesState {
  isModalShown: boolean;
  servers: Server[];
  currentServerId: string;
}

export interface Server {
  id: string;
  description: string;
  natsUrl: string;
  healthCheck: string;
}