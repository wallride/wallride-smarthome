import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";
import {IBooleanPrimitiveOptions} from "../../../../../models/primitives/options/values/IBooleanPrimitiveOptions";
import {IDevicePropertyOptions} from "./IDevicePropertyOptions";

export interface IDevicePropertyBooleanOptions extends IDevicePropertyOptions<PrimitiveTypeEnum.BOOLEAN>, IBooleanPrimitiveOptions {
}