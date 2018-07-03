import {PrimitiveTypeEnum} from "../../../../../models/primitives/options/PrimitiveTypeEnum";

export interface IDevicePropertyOptions<T = PrimitiveTypeEnum> {
    type: T;
}