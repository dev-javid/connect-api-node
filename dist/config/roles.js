"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    roles: ()=>roles,
    roleRights: ()=>roleRights
});
const allRoles = {
    app: [
        'addClient',
        'getLicense'
    ],
    admin: [
        'manageUsers',
        'manageClients'
    ]
};
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

//# sourceMappingURL=roles.js.map