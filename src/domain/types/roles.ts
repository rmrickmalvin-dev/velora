export const userRoles = [
  "GUEST",
  "CUSTOMER",
  "ADMIN",
] as const;

export type UserRole =
  (typeof userRoles)[number];

export function isUserRole(
  value: string,
): value is UserRole {
  return userRoles.includes(
    value as UserRole,
  );
}