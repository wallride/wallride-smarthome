import {UDPResourceConfigurationType} from "../../../resources/udp/UDPResourceConfigurationType";
import {IVendorConfiguration} from "../../_abstract/configuration/IVendorConfiguration";
import {UDPTransportConfigurationType} from "../../_abstract/configuration/TransportConfigurationType";
import {MiVendorType} from "../MiVendor";
import {IMiDevicesConfiguration} from "./IMiDevicesConfiguration";

export interface IMiVendorConfiguration extends IVendorConfiguration {
    name: MiVendorType;
    transport: UDPTransportConfigurationType;
    devices: IMiDevicesConfiguration;

    resources: {
        udp: UDPResourceConfigurationType[]
    };
}