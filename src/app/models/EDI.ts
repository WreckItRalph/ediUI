

export class EDI {
    categories: Category[];
    templateName: string;
    templateTimestamp: string;


}

export class Category {
    name: string;
    categoryId: string;
    fields: Field[];

    constructor() {
        this.name = '';
        this.categoryId = '',
            this.fields = [];
    }
}

export class Field {
    AL3ShortDescription: string;
    AL3Id: string;
    FormCaption: string;
    Length: string;
  Position: string;
  Delimiter: string;

    constructor() {
        this.AL3ShortDescription = '';
        this.AL3Id = '';
        this.FormCaption = '';
        this.Delimiter = '';
        this.Length = '';
        this.Position = ''
    }
}

