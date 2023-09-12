import { Paginator } from "../paginator"

export * from "./response";

declare module "paginator-v1" {
    export = Paginator;
}