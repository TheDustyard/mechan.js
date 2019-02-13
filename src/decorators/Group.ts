/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

import "reflect-metadata";

type Constructor<T> = new(...args: any[]) => T;

/** Create a command group from a class */
export function Group(name: string = "", children: Constructor<any>[] = []) {
    return <C, T extends Constructor<C>>(target: T) => {
        // Define children
        Reflect.defineMetadata("mechan:children", children, target);
        // Define command name
        Reflect.defineMetadata("mechan:name", name, target);
    };
}