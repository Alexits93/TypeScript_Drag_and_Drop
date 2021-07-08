export interface Validatable {
    value: string | number;
    required?: boolean;
    minLenght?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}