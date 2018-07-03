import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";
import {IDatePrimitiveOptions} from "../../../../../models/primitives/options/values/IDatePrimitiveOptions";
import {IDevicePropertyOptions} from "./IDevicePropertyOptions";

export interface IDevicePropertyDateOptions extends IDevicePropertyOptions<PrimitiveTypeEnum.DATE>, IDatePrimitiveOptions {
}
