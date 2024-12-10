export interface GameEntity {
    update(deltatime: number): void
    resize?(): void
}