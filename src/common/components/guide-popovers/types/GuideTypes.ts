type GuideType =
  | 'HEADER_USER'
  | 'HEADER_STAFF'
  | 'STUFF_LIST_COMMON'
  | 'STUFF_LIST_USER'
  | 'STUFF_DETAIL_STAFF'
  | 'USER_TAB_MASTER';

export const GUIDE_TYPES: GuideType[] = [
  'HEADER_USER',
  'HEADER_STAFF',
  'STUFF_LIST_COMMON',
  'STUFF_LIST_USER',
  'STUFF_DETAIL_STAFF',
  'USER_TAB_MASTER',
];

export default GuideType;
