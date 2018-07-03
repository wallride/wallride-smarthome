import {NumericRangeType} from "../../../../types";
import {IPrimitiveOptions} from "../IPrimitiveOptions";
import {PrimitiveTypeEnum} from "../PrimitiveTypeEnum";

export interface INumberPrimitiveOptions extends IPrimitiveOptions<PrimitiveTypeEnum.NUMBER> {
    value?: {
        range?: NumericRangeType;
        enumeration?: number[];
    }
}