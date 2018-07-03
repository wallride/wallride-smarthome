import {PrimitiveTypeEnum} from "./PrimitiveTypeEnum";

export interface IPrimitiveOptions<T extends PrimitiveTypeEnum = PrimitiveTypeEnum> {
    type: T;

    nullable?: boolean;     // Null/undefined value is prohibited by default
}