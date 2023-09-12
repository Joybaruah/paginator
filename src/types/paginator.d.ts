import { PaginatedResponse } from "./response";
import mongoose, { Query, Document } from "mongoose";

  
/**
* Represents a paginator to get paginated response using mongoose model.
* This class helps with managing pagination for a given Mongoose model.
*/

export class Paginator {
  private query: Query<Document[], Document>;

  /**
   * Create a MongoosePaginator instance.
   * Send a Executable Query
   * @param {mongoose.Query} query - The Mongoose query to paginate.
   */

  constructor(query: Query<Document[], Document>) {
    this.query = query;
  }

  private _page_size: number = 20; // Default size is 20
  private _sort: string = "-_id";

  /**
   * Sets the page size.
   * @default 10
   */

  set page_size(newSize: number) {
    if (newSize <= 0) {
      throw new Error("Size must be a positive number");
    }
    this._page_size = newSize;
  }

  get page_size() {
    return this._page_size;
  }

  /**
   * Sets the sorting.
   * @default "-_id"
   */

  set sort(newSort: string) {
    this._sort = newSort;
  }
  get sort_value() {
    return this._sort;
  }

  /**
   * Get Paginated Response
   * Next and Previous page as Boolean
   */

  async getPaginatedResponse(page: number) {
    const totalDocumentsRecords = await this.query.clone().countDocuments({});

    // // Calculate the total number of pages
    const totalPages = Math.ceil(totalDocumentsRecords / this.page_size);

    // Determine if there's page
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const result = await this.query
      .limit(this.page_size)
      .sort(this._sort)
      .skip((page - 1) * this.page_size)
      .exec();

    const response: PaginatedResponse = {
      result,
      hasNextPage,
      hasPreviousPage,
    };

    return response;
  }
}
  
