declare module "json2csv" {
  export class Parser<T = any> {
    constructor(opts?: { fields?: string[]; header?: boolean });
    parse(data: T | T[]): string;
  }
}
