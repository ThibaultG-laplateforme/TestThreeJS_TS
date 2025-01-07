import { TResource } from "../Engine/interface/Resource";

export default  [
    {
        name : "foxModel",
        type : 'gltf',
        path : 'model/Fox/glTF-Binary/Fox.glb'
    },
    {
        name : "DirtColorTexture",
        type : 'texture',
        path : 'texture/dirt/color.jpg'
    },
    {
        name : "DirtNormalTexture",
        type : 'texture',
        path : 'texture/dirt/normal.jpg'
    }
] as TResource[]