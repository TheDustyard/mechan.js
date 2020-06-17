"use strict";
/*!
 * Copyright (C) 2019  Zachary Kohnen
 */
Object.defineProperty(exports, "__esModule", { value: true });
function Command(name = "") {
    return (object, key) => {
        Reflect.defineMetadata("mechan:name", name, object, key);
        console.log(Reflect.getMetadataKeys(object, key));
        let types = Reflect.getMetadata("design:paramtypes", object, key);
        let s = types.map(a => a.name).join();
        console.log(`${key} param types: ${s}`);
        let typee = Reflect.getMetadata("design:returntype", object, key);
        console.log(`${key} return types: ${typee.name}`);
    };
}
exports.Command = Command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQWFILFNBQWdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRTtJQUM3QixPQUFPLENBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxFQUFFO1FBRW5DLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBcUIsQ0FBQztRQUN0RixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBbUIsQ0FBQztRQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWRELDBCQWNDIn0=