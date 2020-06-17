"use strict";
/*!
 * Copyright (C) 2019  Zachary Kohnen
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Client extends discord_js_1.Client {
    constructor(options) {
        super(options);
        console.log(CommandGroupInfo(options.commands));
    }
}
exports.default = Client;
function CommandGroupInfo(groups) {
    let groupnames = [];
    for (let group of groups) {
        let children = Reflect.getMetadata("mechan:children", group);
        let name = Reflect.getMetadata("mechan:name", group);
        let instance = new group();
        console.log(Reflect.getMetadataKeys(group), group, instance);
        for (let key of Object.keys(instance)) {
            console.log(Reflect.getMetadataKeys(group, key));
            if (instance[key] instanceof Function) {
                console.log(`FN ${key}`);
            }
        }
        groupnames.push(name);
        groupnames = groupnames.concat(CommandGroupInfo(children).map(x => `${name} ${x}`));
    }
    return groupnames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMkNBQW9FO0FBV3BFLE1BQXFCLE1BQU8sU0FBUSxtQkFBYTtJQUM3QyxZQUFZLE9BQXVCO1FBQy9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBTkQseUJBTUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE1BQXNCO0lBQzVDLElBQUksVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUM5QixLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtRQUN0QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBbUIsQ0FBQztRQUMvRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQVcsQ0FBQztRQUUvRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFN0QsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxRQUFRLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7UUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN2RjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUMifQ==