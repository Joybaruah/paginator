import { Paginator } from "./types/paginator"

export * from "./types/response";

declare module "paginator-v1" {
    export = Paginator;
}