import {DeviceSelector} from "../devices/DeviceSelector";

/**
 * This interface describes some state change on a particular device's module
 */
export interface IModuleAction<State> {
    deviceSelector: DeviceSelector,
    module: {
        name: string
        state: State
    },
}