export class DeviceSelector<Vendor = string, Type = string> {
    constructor(public vendor: Vendor, public type: Type, public id: string = null) {}

    toString(): string {
        return this.vendor + '-' + this.type + '-' + (this.id || 'null');
    }

}
