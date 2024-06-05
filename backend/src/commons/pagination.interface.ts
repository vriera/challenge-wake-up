export class Paginated<T = any> {
  result: T[];
  last_page: number;
  total_count: number;

  constructor(result: T[], total: number, page_size: number) {
    this.result = result;
    this.total_count = total;
    this.last_page = Math.floor(
      total % page_size === 0 ? total / page_size - 1 : total / page_size,
    );
    if (this.last_page < 0) this.last_page = 0;
  }
}
