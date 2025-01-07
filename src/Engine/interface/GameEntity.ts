
export interface IGameEntity {
    Init() : void
    Update(deltatime: number): void;

    OnDestroy?() : void;

    Resize?(): void;
}



