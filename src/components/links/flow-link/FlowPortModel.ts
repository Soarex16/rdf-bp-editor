import {DefaultPortModel, PortModel, PortModelGenerics} from '@projectstorm/react-diagrams';
import {FlowLinkModel} from './FlowLinkModel';
import {DefaultPortModelOptions} from '@projectstorm/react-diagrams-defaults';
import {TextInputLabelModel} from '../../labels/text-input-label/TextInputLabelModel';

export const flowPortType: string = 'flow-port';

export class FlowPortModel extends DefaultPortModel {
    in: boolean;

    constructor(options: DefaultPortModelOptions) {
        super({
            ...options,
            type: flowPortType
        });
        this.in = options.in;
    }

    createLinkModel(): FlowLinkModel {
        const model = new FlowLinkModel();

        model.addLabel(new TextInputLabelModel({
            value: 'alias'
        }));

        return model;
    }

    // запрещаем более одной связи между каждой парой портов
    canLinkToPort(port: PortModel<PortModelGenerics>): boolean {
        // из конца в начало не соединяем
        if (this.in) {
            return false;
        }

        // проходимся по всем связям и проверяем, нет ли среди них того, который хотим добавить
        // NOTE: getLinks возвращает все соединения в диаграмме, что не очень эффективно в случае, когда соединений много
        const links = this.getLinks();
        const sourceID = this.getID();
        for (let linkId in links) {
            const sourcePort = links[linkId].getSourcePort();
            const targetPort = links[linkId].getTargetPort();
            if (sourcePort && sourcePort.getID() === sourceID && targetPort && port.getID() === targetPort.getID()) {
                return super.canLinkToPort(port) && false;
            }
        }

        // true && super.canLinkToPort(port)
        return super.canLinkToPort(port);
    }
}