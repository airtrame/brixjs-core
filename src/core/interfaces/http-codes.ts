export interface HttpCodes {
    [category: string]: {
        description : string
        examples?: {
            [code: string]: string;
        };
    };
}