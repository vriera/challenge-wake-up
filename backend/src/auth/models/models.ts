export enum UserType {
  MANAGER = 'M',
  WAITER = 'W',
}

export interface AuthUserInfo {
  id: number;
  username: string;
  type: UserType;
}

export interface JWTPayload {
  sub: number;
  restaurantId: number;
  username: string;
  type: UserType;
}
