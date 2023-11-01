type AuthorityPermission = 'NIL' | 'DEFAULT' | 'BANNED' | 'USER' | 'STAFF' | 'MASTER' | 'DEVELOPER';
export const AUTHORITY_PERMISSIONS: AuthorityPermission[] = [
  'NIL',
  'DEFAULT',
  'BANNED',
  'USER',
  'STAFF',
  'MASTER',
  'DEVELOPER',
];

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
