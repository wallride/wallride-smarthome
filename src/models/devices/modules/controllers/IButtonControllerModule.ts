import {IDiscreetControllerDeviceModule} from "./IDiscreetControllerDeviceModule";


export enum ButtonControllerStateEnum {
    PRESS = 'press',
    RELEASE = 'release',
    CLICK = 'click',
    LONG_PRESS = 'longPress',
    DOUBLE_CLICK = 'doubleClick',
}

export interface IButtonControllerModule extends IDiscreetControllerDeviceModule<ButtonControllerStateEnum> {

}