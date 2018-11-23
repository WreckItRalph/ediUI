

export class EDI {
    categories: Category[];
    templateName: string;
    templateTimestamp: string;
  }
  
  export class Category {
    name: string;
    categoryId: string;
    fields: Field[];
  }
  
  export class Field {
    AL3ShortDescription: string;
    AL3Id: string;
    FormCaption: string;
  }