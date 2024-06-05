/*
    I have not enough  experience with TypeORM but for some reason is turning decimals into strings,
    in the Database i can see it's stored as a numeric. I found this the following solution:
    //https://stackoverflow.com/questions/69872250/typeorm-decimal-column-values-returned-as-strings-instead-of-decimal-numbers/70127622
*/
/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
