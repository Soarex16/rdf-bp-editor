import createEngine, {DefaultDiagramState, DefaultLinkModel, DiagramModel} from '@projectstorm/react-diagrams';
import {DeleteItemsAction} from '@projectstorm/react-canvas-core';
import {SparQLInputNodeModel} from '../components/nodes/input-node/SparQLInputNodeModel';
import {SparQLInputNodeFactory} from '../components/nodes/input-node/SparQLInputNodeFactory';
import {ProcessingNodeModel} from '../components/nodes/processing-node/ProcessingNodeModel';
import {ProcessingNodeFactory} from '../components/nodes/processing-node/ProcessingNodeFactory';
import {BranchNodeFactory} from '../components/nodes/branch-node/BranchNodeFactory';
import {BranchNodeModel} from '../components/nodes/branch-node/BranchNodeModel';

// create an instance of the engine
const engine = createEngine({
    registerDefaultDeleteItemsAction: false
});

engine.getActionEventBus().registerAction(new DeleteItemsAction({keyCodes: [46]}));

// prevent loose links
const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
    state.dragNewLink.config.allowLooseLinks = false;
}

// limit number of points per link
engine.setMaxNumberPointsPerLink(0);

// register factories
engine.getNodeFactories().registerFactory(new SparQLInputNodeFactory());
engine.getNodeFactories().registerFactory(new ProcessingNodeFactory());
engine.getNodeFactories().registerFactory(new BranchNodeFactory());

// create a diagram model
const model = new DiagramModel();

// create some nodes
const inputNode1 = new SparQLInputNodeModel({graphQLQuery: 'asdasdasd'});
inputNode1.setPosition(100, 50);

const inputNode2 = new SparQLInputNodeModel({graphQLQuery: 'asdasdasd'});
inputNode2.setPosition(100, 350);

const processingNode1 = new ProcessingNodeModel({processingScriptName: 'CheckSubstitution'});
processingNode1.setPosition(800, 250);

const branchNode1 = new BranchNodeModel();
branchNode1.setPosition(500, 250);

// and some links between nodes
const link1 = new DefaultLinkModel();
(link1 as DefaultLinkModel).addLabel('Custom label 1');
(link1 as DefaultLinkModel).addLabel('Custom label 2');
link1.setSourcePort(inputNode1.getPort('out'));
link1.setTargetPort(branchNode1.getPort('in'));

const link2 = new DefaultLinkModel();
(link2 as DefaultLinkModel).addLabel('Custom label 2');
(link2 as DefaultLinkModel).addLabel('∀person∈X(person.name != "John" & P(person))');
link2.setColor('#2e54ab');
link2.setSourcePort(inputNode2.getPort('out'));
link2.setTargetPort(processingNode1.getPort('in'));


model.addAll(inputNode1, inputNode2, processingNode1, link2, link1, branchNode1);

// install the model into the engine
engine.setModel(model);

export default engine;
