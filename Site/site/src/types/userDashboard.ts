

export type Light = {
    id: string;
    name: string, 
    ilumminence: string, 
    range: string, 
    color: string, 
}[]
type Video = {
    id: string;
    time: string;
    name: string;
    url: string;
}[]
export type Wall = {
    id: string;
    name: string;
    color: string;
}[]
export type UserDashboard = {
    Light: Light;
    Video: Video;
    Wall: Wall;
    email: string;
    id: string;
    name: string;
    role: string;
    _count: { Video: 0; Light: 0; Wall: 0 };
  };