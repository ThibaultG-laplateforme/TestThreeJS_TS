export class EventEmitter {
    private eventListener : {[key : string] : Function[]} = {}

    
    protected eventListenerCount(eventName: string) {
        return this.eventListener[eventName] ? this.eventListener[eventName].length : 0
    }


    public on(eventName : string, callBack : Function) {

        eventName.replaceAll(/ /g, '')
        if (eventName === '') {
            console.error("The event name was null !");
            return false;
        }

        console.log("event associate : " + this.eventListener[eventName])
        if (!this.eventListener[eventName]){
            this.eventListener[eventName] = [];
        }
        this.eventListener[eventName].push(callBack);
        
        return true;
    }

    public off(eventName : string, callBack : Function) {

        eventName.replaceAll(/ /g, '')
        if (eventName === '') {
            console.error("The event name is null !");
            return false;
        }
        
        if (!this.eventListener[eventName]){
            console.error(`The event "${eventName}" is not registered !`);
            return false;
        }

        const index = this.eventListener[eventName].indexOf(callBack);

        if (index === -1) {
            console.error(`The event "${eventName}" has not this callback`)
            return false;
        }

        this.eventListener[eventName].splice(index, 1);
        return true;
    }

    public emit(eventName : string, ...args : any[]) {

        eventName.replaceAll(/ /g, '')
        if (eventName === '') {
            console.error("The event name is null !");
            return false;
        }

        if (!this.eventListener[eventName]){
            console.error(`The event "${eventName}" is not registered !`);
            return false;
        }

        this.eventListener[eventName].forEach((callback) => {callback(...args)})
    } 
}