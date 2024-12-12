export interface IGameEntity {
    update(deltatime: number): void
    resize?(): void
}