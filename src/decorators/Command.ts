/*!
 * Copyright (C) 2019  Zachary Kohnen
 */

// /** Create a command group from a class */
// export function Group(name: string = "", children: Constructor<any>[] = []) {
//     return <C, T extends Constructor<C>>(target: T) => {
//         // Define children
//         Reflect.defineMetadata("mechan:children", children, target);
//         // Define command name
//         Reflect.defineMetadata("mechan:name", name, target);
//     };
// }

/** Make a method into a command handler  */
export function Command(name = "") {
    return (object: Object, key: string) => {
        // Define command name
        Reflect.defineMetadata("mechan:name", name, object, key);

        console.log(Reflect.getMetadataKeys(object, key));

        let types = Reflect.getMetadata("design:paramtypes", object, key) as {name: string}[];
        let s = types.map(a => a.name).join();
        console.log(`${key} param types: ${s}`);

        let typee = Reflect.getMetadata("design:returntype", object, key) as {name: string};
        console.log(`${key} return types: ${typee.name}`);
    };
}