import {IDiscreetControllerDeviceModule} from "./IDiscreetControllerDeviceModule";


export enum KeyControllerStateEnum {
    ON = 'on',
    OFF = 'off',
}

export interface IKeyControllerModule extends IDiscreetControllerDeviceModule<KeyControllerStateEnum> {}