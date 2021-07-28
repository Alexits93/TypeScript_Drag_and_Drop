/**
 * 
 * @param _ 
 * @param _2 
 * @param descriptor 
 * @returns 
 * In the called methods, the "this" keyword doesn't point to the class it's called in.
 * When we bind something to an event (or with the help of addEventListener), then that something, so that method which is going to get executed
 * will have "this" bound to something else (in this case, to the current target of the event). So "this" inside of this method will not point
 * at the Class, when the method is triggered upon an event, with addEventListener.
 */ 
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    } as PropertyDescriptor;
}