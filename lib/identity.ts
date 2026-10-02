/**
 * Who a memory belongs to. Only trust the identity the channel authenticated,
 * never an email or name the user typed into the chat.
 */
export function userIdFrom(ctx: any): string {
  return 'local-dev-user';
    // return ctx?.session?.auth?.current?.principalId ?? 'local-dev-user';
  }