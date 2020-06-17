"use strict";
/*!
 * Copyright (C) 2019  Zachary Kohnen
 */
Object.defineProperty(exports, "__esModule", { value: true });
function Group(name = "", children = []) {
    return (target) => {
        Reflect.defineMetadata("mechan:children", children, target);
        Reflect.defineMetadata("mechan:name", name, target);
    };
}
exports.Group = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBS0gsU0FBZ0IsS0FBSyxDQUFDLE9BQWUsRUFBRSxFQUFFLFdBQStCLEVBQUU7SUFDdEUsT0FBTyxDQUE4QixNQUFTLEVBQUUsRUFBRTtRQUU5QyxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1RCxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVBELHNCQU9DIn0=