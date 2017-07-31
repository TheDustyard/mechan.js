import { CommandContext } from '../../';

export type PermissionCheck =
    (event: CommandContext) => [boolean, string];