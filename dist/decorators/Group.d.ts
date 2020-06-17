/*!
 * Copyright (C) 2019  Zachary Kohnen
 */
declare type Constructor<T> = new (...args: any[]) => T;
export declare function Group(name?: string, children?: Constructor<any>[]): <C, T extends Constructor<C>>(target: T) => void;
export {};
