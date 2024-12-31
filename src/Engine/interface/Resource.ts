import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export type TResource = {
    name : string
    type : Exclude<TAsset, 'cubeTexture'>
    path : string
} | {
    name : string
    type : 'cubeTexture'
    path : string[]
}

export type TAsset = 'gltf' | 'texture' | 'cubeTexture';

export type TLoaders = {
    gltf : GLTFLoader
    texture : THREE.TextureLoader
    cubeTexture : THREE.CubeTextureLoader
}