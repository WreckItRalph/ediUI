

export class EDI {
    categories: Category[];
    templateName: string;
    templateTimestamp: string;


}

export class Category {
    name: string;
    categroyID: string;
    fields: Field[];

    constructor() {
        this.name = '';
        this.categroyID = '',
            this.fields = [];
    }
}

export class Field {
    AL3ShortDescription: string;
    AL3Id: string;
    FormCaption: string;

    constructor() {
        this.AL3ShortDescription = '';
        this.AL3Id = '';
        this.FormCaption = '';
    }
}