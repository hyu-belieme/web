export class BaseError {
  public name: string;

  public message: string;

  constructor(oth: BaseError) {
    this.name = oth.name;
    this.message = oth.message;
  }
}

export const NETWORK_ERROR: BaseError = {
  name: 'NETWORK_ERROR',
  message:
    '현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
} as const;
