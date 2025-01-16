import * as CANNON from 'cannon-es'
import Component from '../../Component'


export default class Collider extends Component {

    public readonly meshCollider : CANNON.Shape

    constructor( meshCollider : CANNON.Shape ){
        super();
        this.meshCollider = meshCollider;
    }
}