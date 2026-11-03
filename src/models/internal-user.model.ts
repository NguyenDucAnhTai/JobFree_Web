import type { InternalRole } from "./internal-role.model";

export interface InternalUser {
  id: string;
  name: string;
  email: string;
  role: InternalRole;
}
