type AuthorityPermission = 'NIL' | 'BANNED' | 'DEFAULT' | 'USER' | 'STAFF' | 'MASTER' | 'DEVELOPER';
export const AUTHORITY_PERMISSIONS: AuthorityPermission[] = [
  'NIL',
  'BANNED',
  'DEFAULT',
  'USER',
  'STAFF',
  'MASTER',
  'DEVELOPER',
];

export function hasHigherAuthorityPermission(
  a: AuthorityPermission,
  b: AuthorityPermission
): boolean {
  return AUTHORITY_PERMISSIONS.indexOf(a) >= AUTHORITY_PERMISSIONS.indexOf(b);
}

export function parseAuthorityPermission(str: any): AuthorityPermission {
  switch (str) {
    case 'DEFAULT':
    case 'BANNED':
    case 'USER':
    case 'STAFF':
    case 'MASTER':
    case 'DEVELOPER':
      return str;
    default:
      return 'NIL';
  }
}

export function toString(e: AuthorityPermission): string {
  if (e === 'NIL') return '-';
  return e.toLowerCase();
}

export default AuthorityPermission;
