export enum DeviceModuleTypeEnum {
    SENSOR = 'sensor',              // readonly events (commonly with scalar data) provider
    CONTROLLER = 'controller',      // discreet events provider
    CONTROLLABLE = 'controllable',  // data consumer on a device
    CONFIGURABLE = 'configurable'   // user configurable unit providing settings for other units within the device
}