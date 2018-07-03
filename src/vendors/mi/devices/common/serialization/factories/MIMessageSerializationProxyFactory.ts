import * as im from '@ips.su/im'

import {BaseError} from "../../../../../../BaseError";
import {MiAbstractMessage} from "../../messages/MiAbstractMessage";
import {AbstractSerializationProxyFactory} from "../../../../../../serialization/AbstractSerializationProxyFactory";

export type MessageSerializationRegistrationOptions = {
    classFunction: Function,
    serializer: im.ISerializer<MiAbstractMessage>
    cmd: string,
    model?: string
}

export class MIMessageSerializationProxyFactory extends AbstractSerializationProxyFactory<MiAbstractMessage> {
    protected targetRouting: Map<string, Map<string, Function> | Function> = new Map(); // cmd -> Class Constructor | (model -> Class Constructor)

    register(options: MessageSerializationRegistrationOptions | MessageSerializationRegistrationOptions[]): this {
        for (const op of Array.isArray(options)? options : [options]) this.registerOne(op);

        return this;
    }

    protected registerOne(options: MessageSerializationRegistrationOptions): this {
        const cmd = this.targetRouting.get(options.cmd);

        if (options.model){
            if (!cmd){
                this.targetRouting.set(
                    options.cmd,
                    new Map([[options.model, options.classFunction]])
                )
            }
            else{
                if (typeof cmd === 'function')
                    throw new BaseError(this, 'Cannot register a model-defined Message class due to "cmd" is taken by non-model-specific registration')
                        .addItem('cmd', options.cmd)
                        .addItem('taken by class', cmd.name)
                        .addItem('Trying to bind model', options.model)
                        .addItem('Trying to bind class', options.classFunction.name);

                cmd.set(options.model, options.classFunction)
            }
        }
        else {
            if (!cmd) this.targetRouting.set(options.cmd, options.classFunction)
            else{
                throw new BaseError(this, 'Cannot register a Message class due to "cmd" is taken by another registration')
                    .addItem('cmd', options.cmd)
                    .addItem('Taken by', cmd)
                    .addItem('Trying to bind class', options.classFunction.name);
            }
        }


        this.getDependency().classFactory.register(options.classFunction, im.io.json.type, options.serializer);

        return this;
    }

    protected getCmd(input: im.io.AbstractInput): string {
        if (input instanceof im.io.json.inputs.JSAbstractPlaceholderInput) return this.getCmd(input.asObject());
        if (input instanceof im.io.json.inputs.JSAbstractObjectInput) {
            return input.getProperty('cmd').asString().getValue();
        }
        else throw new im.errors.UnsupportedIOTypeError(this, input);
    }

    protected getModel(input: im.io.AbstractInput): string|undefined {
        if (input instanceof im.io.json.inputs.JSAbstractPlaceholderInput) return this.getModel(input.asObject());
        if (input instanceof im.io.json.inputs.JSAbstractObjectInput) {
            if (!input.hasProperty('model')) return;

            return input.getProperty('model').asString().getValue();
        }
        else throw new im.errors.UnsupportedIOTypeError(this, input);
    }


    protected identifyTarget(input: im.io.AbstractInput): Function {
        const cmd = this.getCmd(input);
        const model = this.getModel(input);

        const cmdRegistration = this.targetRouting.get(cmd);
        if (!cmdRegistration) throw new BaseError(this, '"cmd" is not supported', cmd);
        if (typeof cmdRegistration === 'function') return cmdRegistration; //that's it!

        if (!model) throw new BaseError(this, 'No model property parsed, though it is expected!');

        const target = cmdRegistration.get(model);
        if (!target) throw new BaseError(this, 'No matching target serializer for message parameters')
            .addItem('cmd', cmd)
            .addItem('model', model);

        return target;
    }
}