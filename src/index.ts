import {MongoResourceConfigurationType} from "./resources/db/mongo/MongoResourceConfigurationType";
import {MongoResourceProvider} from "./resources/db/mongo/MongoResourceProvider";
import {PrimitiveTypeEnum} from "./models/primitives/options/PrimitiveTypeEnum";

import {IMiVendorConfiguration} from "./vendors/mi/configuration/IMiVendorConfiguration";
import {MiVendorBuilder} from "./vendors/mi/builder/MiVendorBuilder";

// const config = JSON.parse(fs.readFileSync('./resources/config.json', 'utf8'));

const miResourceUri = 'udp://xiaomi';

const miConfiguration: IMiVendorConfiguration = {
    name: 'mi',
    transport: {
        type: "udp",
        uri: "udp://xiaomi",
        autoReconnect: true
    },
    devices: {
        discovery: {
            name: 'discovery',
            addresses: {
                discover: {host: '224.0.0.50', port: 4321},
                getSubdevices: {host: '224.0.0.50', port: 9898}
            }
        },
        gateway: {
            name: 'gateway',
            properties: {
                protoVersion: {type: PrimitiveTypeEnum.STRING},
                token: {type: PrimitiveTypeEnum.STRING,
                    length: {max: 16, min: 16}
                },
                key: {type: PrimitiveTypeEnum.STRING,
                    length: {max: 16, min: 16}},
                ip: {type: PrimitiveTypeEnum.STRING},
                port: {type: PrimitiveTypeEnum.NUMBER},
                illumination: {type: PrimitiveTypeEnum.NUMBER,

                },
                // custom properties
                customName: {type: PrimitiveTypeEnum.STRING,
                    configurable: true},
                password: {type: PrimitiveTypeEnum.STRING,
                    configurable: true,
                    length: {max: 16, min: 16}},
            }
        },
        motion: {
            name: 'motion',
            properties: {
                voltage: {type: PrimitiveTypeEnum.NUMBER,
                    unit: '%',
                    value: {range: {min:0, max: 3300}}
                },
                lastMotion: {type: PrimitiveTypeEnum.DATE},
                // custom properties
                customName: {type: PrimitiveTypeEnum.STRING,
                    configurable: true},
            }
        },
        "86sw1": {
            name: '86sw1',
            properties: {
                voltage: {type: PrimitiveTypeEnum.NUMBER,
                    unit: '%',
                    value: {range: {min:0, max: 3300}}
                },
                lastEvent: {type: PrimitiveTypeEnum.STRING},
                // custom properties
                customName: {type: PrimitiveTypeEnum.STRING,
                    configurable: true},
            }
        }
    },
    resources: {
        udp: [
            {   uri: "udp://xiaomi",
                bind: {
                    port: 9898,
                    broadcast: true,
                    multicast: {membershipHost: '224.0.0.50'}
                }
            }
        ]
    }
};

const mongoConfiguration: MongoResourceConfigurationType[] = [
    {uri: 'mongodb://common', connection: {uri: 'mongodb://localhost:27017'}}
];



(async () => {

    const connectionResource = await new MongoResourceProvider(mongoConfiguration).getResource('mongodb://common');
    const dbResource = await connectionResource.getDB('mi');
    const devicesResource = await dbResource.getCollection('devices');
    const findItems = await devicesResource.find();
    // await devicesResource.collection.deleteMany({});
    // await devicesResource.collection.createIndex({vendor: 1, type: 1, id: 1}, {unique: true});

    console.log('Mongo checked');

    const vendor = await new MiVendorBuilder(miConfiguration, devicesResource).build();

    console.log('Vendor has built');

    await vendor.setup();
    console.log('Vendor has been setup');

    //
    // const discoveryConfiguration = miConfiguration.devices.discovery;
    // const discoverySelector = new DeviceSelector(discoveryConfiguration.selector.vendor, discoveryConfiguration.selector.type, discoveryConfiguration.selector.id);
    //
    // const deviceProvider = new MiDeviceProvider();
    // deviceProvider.register(discoverySelector, new MiDiscoveryDevice().setConfiguration(discoveryConfiguration));
    //
    // const discoveryDevice = deviceProvider.get(discoverySelector);
    //
    // //
    // // const reportResource = await socketResourceProvider.get(reportSocketUri);
    // //
    // // reportResource.subscribe(async (properties, remoteAddress) => {
    // //     console.log('Report received', properties.toString(), 'from', remoteAddress.host +':'+ remoteAddress.port);
    // //
    // // });
    //
    //
    // const discoveryResource = await socketResourceProvider.get(discoverySocketUri);
    //
    // discoveryResource.subscribe(async (properties, remoteAddress) => {
    //     console.log('Discovery received', properties.toString(), 'from', remoteAddress.host +':'+ remoteAddress.port);
    //
    // });

    //
    //
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'whois'})),
    //     address: discoveryConfiguration.address
    // });
    //
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'get_id_list', sid: '7811dcdee2ca'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    //
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '7811dcdee2ca'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    //
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '158d0002243418'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '158d0002139392'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '158d0001e5f7d6'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '158d0001a8e39e'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    // await discoveryResource.send({
    //     properties: Buffer.from(JSON.stringify({cmd: 'read', sid: '158d0001f4321e'})),
    //     address: {host: '224.0.0.50', port: 9898}
    // });
    //


})().catch(e => console.error(e));

