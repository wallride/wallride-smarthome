import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";
import {INumberPrimitiveOptions} from "../../../../../models/primitives/options/values/INumberPrimitiveOptions";
import {IDevicePropertyOptions} from "./IDevicePropertyOptions";

export interface IDevicePropertyNumberOptions extends IDevicePropertyOptions<PrimitiveTypeEnum.NUMBER>, INumberPrimitiveOptions {
    unit?: string;
}