import {NumericRangeType} from "../../../../types";
import {IPrimitiveOptions} from "../IPrimitiveOptions";
import {PrimitiveTypeEnum} from "../PrimitiveTypeEnum";

export interface IStringPrimitiveOptions extends IPrimitiveOptions<PrimitiveTypeEnum.STRING> {
    value?: {
        length?: number | NumericRangeType,
        enumeration?: string[];
    }
}