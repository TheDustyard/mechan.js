import {
    CommandContext
} from '../../';

//export type PermissionCheckResult = {
//    canRun: boolean,
//    message?: string
//}

export type PermissionCheck =
    (event: CommandContext) => boolean;