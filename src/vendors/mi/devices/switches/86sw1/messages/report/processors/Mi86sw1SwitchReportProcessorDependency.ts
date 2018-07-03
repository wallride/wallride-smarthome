import * as di from '@ips.su/di'
import {MiDeviceProvider} from "../../../../../../providers/MiDeviceProvider";


export class Mi86sw1SwitchReportProcessorDependency implements di.Injectable{
    deviceProvider: MiDeviceProvider = null;

    isValid(): boolean {
        return !!( this.deviceProvider);
    }

}