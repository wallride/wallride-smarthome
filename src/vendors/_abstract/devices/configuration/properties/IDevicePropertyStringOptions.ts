import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";
import {IStringPrimitiveOptions} from "../../../../../models/primitives/options/values/IStringPrimitiveOptions";
import {IDevicePropertyOptions} from "./IDevicePropertyOptions";

export interface IDevicePropertyStringOptions extends IDevicePropertyOptions<PrimitiveTypeEnum.STRING>, IStringPrimitiveOptions {
}
