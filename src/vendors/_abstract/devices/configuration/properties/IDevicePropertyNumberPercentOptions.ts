import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";
import {INumberPrimitiveOptions} from "../../../../../models/primitives/options/values/INumberPrimitiveOptions";
import {NumericRangeType} from "../../../../../types";
import {IDevicePropertyOptions} from "./IDevicePropertyOptions";

export interface IDevicePropertyNumberPercentOptions extends IDevicePropertyOptions<PrimitiveTypeEnum.NUMBER>, INumberPrimitiveOptions {
    unit: '%'
    // range may be different from 0..100 and values are to be transformed from 0..100 to custom range
    // also this property may need custom representation and controls
    percentage: true
    value: {
        range: NumericRangeType
    }
}