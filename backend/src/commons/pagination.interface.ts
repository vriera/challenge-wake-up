

export class Paginated<T = any> {
    result: T[];
    total_pages: number;
    total_count: number;

    constructor(result: T[] , total:number , page_size:number){
        this.result = result;
        this.total_count = total;
        this.total_pages = Math.floor(total % page_size === 0 ? total/page_size -1 : total/page_size);
        if(this.total_pages < 0)
            this.total_pages = 0;
    }
}