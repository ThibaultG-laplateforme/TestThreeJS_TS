export interface ST_DebugMessage {
    parentName : string,
    type : TMessageConsoleType,
    message : string
}

type TMessageConsoleType = 'infos' | 'log' | 'warn' | 'error';

export class DebugMessage {
    constructor(){

    }


}