export interface RobloxProfilePayload {
  id: string;
  provider: "roblox";
  accessToken: string;
  refreshToken: string | undefined;
  name: string;
  nickname: string;
  preferred_username: string;
  createdAt: number;
  profile: string;
  picture: string;
}
