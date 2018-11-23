
export class EDI {
    header: Header;
    categories: Category[];
}

interface Category {
    name: string;
    id: string;
    fields: Field[];
}

interface Field {
    name: string;
    id: string;
}

interface Header {
    templateId: string;
    templateName: string;
    date: string;
}