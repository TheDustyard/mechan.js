import { CommandContext } from '../CommandContext';

export interface PermissionCheck {
    /**
     * Function to eveluate if a user has the required permissions
     */
    check(event: CommandContext): [boolean, string];
}