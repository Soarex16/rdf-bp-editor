import createEngine, {DefaultDiagramState, DiagramModel} from '@projectstorm/react-diagrams';
import {DeleteItemsAction} from '@projectstorm/react-canvas-core';
import {SparQLInputNodeFactory} from './components/nodes/input-node/SparQLInputNodeFactory';
import {ProcessingNodeFactory} from './components/nodes/processing-node/ProcessingNodeFactory';
import {BranchNodeFactory} from './components/nodes/branch-node/BranchNodeFactory';
import {FormulaEditorLabelFactory} from './components/labels/formual-editor-label/FormulaEditorLabelFactory';
import {FlowLinkFactory} from './components/links/flow-link/FlowLinkFactory';
import {FlowPortFactory} from './components/ports/flow-port/FlowPortFactory';
import {CopyPasteItemsAction} from './components/editor/actions/CopyPasteItemsAction';
import {BranchLinkFactory} from './components/links/branch-link/BranchLinkFactory';
import {BranchPortFactory} from './components/ports/branch-port/BranchPortFactory';
import {TextInputLabelFactory} from './components/labels/text-input-label/TextInputLabelFactory';
import {SelectAllItemsAction} from './components/editor/actions/SelectAllItemsAction';
import {StoreResultNodeFactory} from './components/nodes/output-node/StoreResultNodeFactory';
import {MergeNodeFactory} from './components/nodes/merge-node/MergeNodeFactory';

// create an instance of the engine
const engine = createEngine({
    registerDefaultDeleteItemsAction: false
});

engine.getActionEventBus().registerAction(new DeleteItemsAction({keyCodes: [46]}));
engine.getActionEventBus().registerAction(new CopyPasteItemsAction());
engine.getActionEventBus().registerAction(new SelectAllItemsAction());

// prevent loose links
const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
    state.dragNewLink.config.allowLooseLinks = false;
}

// limit number of points per link
engine.setMaxNumberPointsPerLink(0);

// register factories
engine.getNodeFactories().registerFactory(new SparQLInputNodeFactory());
engine.getNodeFactories().registerFactory(new StoreResultNodeFactory());
engine.getNodeFactories().registerFactory(new ProcessingNodeFactory());
engine.getNodeFactories().registerFactory(new BranchNodeFactory());
engine.getNodeFactories().registerFactory(new MergeNodeFactory());

engine.getLinkFactories().registerFactory(new FlowLinkFactory());
engine.getLinkFactories().registerFactory(new BranchLinkFactory());

engine.getPortFactories().registerFactory(new FlowPortFactory());
engine.getPortFactories().registerFactory(new BranchPortFactory());

engine.getLabelFactories().registerFactory(new FormulaEditorLabelFactory());
engine.getLabelFactories().registerFactory(new TextInputLabelFactory());

// create a diagram model
const model = new DiagramModel();
// install the model into the engine
engine.setModel(model);

export default engine;
