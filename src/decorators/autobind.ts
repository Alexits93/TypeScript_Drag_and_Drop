/**
 * method decorator
 * @param _ - target: any
 * @param _2 - propertyKey: string
 * @param descriptor - descriptor of the method - 
 * PropertyDescriptor, because methods are just properties which hold functions
 * @returns 
 */
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    // To get access to the method which is originally defined
    const originalMethod = descriptor.value;
    // we are returning an adjusted descriptor, which fits our needs.
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    } as PropertyDescriptor;
}