export class PageEntity {
  pageSize: number;
  current: number;
  get skip() {
    return (this.current - 1) * this.pageSize;
  }
  get take() {
    return this.pageSize;
  }
  constructor(partial: Partial<PageEntity>) {
    Object.assign(this, partial);
  }
}
