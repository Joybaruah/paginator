import { Document } from "mongoose";

export interface PaginatedResponse {
  result: Document[];
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
}
