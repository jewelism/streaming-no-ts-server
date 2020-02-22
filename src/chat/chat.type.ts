type TRoomId = string;
type TMemberId = string;
export type TRoomMap = Map<TRoomId, TMemberMap>;
type TMemberMap = Map<TMemberId, IClientMeta>;

export interface IMessageBody {
  senderId: TMemberId;
  roomId: TRoomId;
  date: number;
  text: string;
}
export interface IClient {
  roomId: TRoomId;
  nickname: string;
  socketId: string;
}
interface IClientMeta {
  nickname: string;
}