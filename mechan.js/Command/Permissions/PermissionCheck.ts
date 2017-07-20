import { CommandEventArgs } from '../CommandEventArgs';

export interface PermissionCheck {
    /**
     * Function to eveluate if a user has the required permissions
     */
    check (event: CommandEventArgs): boolean;
}