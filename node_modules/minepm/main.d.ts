interface Server {
  name: string;
  port: string;
  motd: string;
  players: { 
    online: number; 
    max: number 
  };
  other: { 
    status: 'online' | 'offline'; 
    error: string | null; 
    last_online: string; 
    protocol: number;
  };
}

interface Logo {
  favicon: string;
  code: number;
}

interface Player {
  pseudo: string;
  uuid: string;
  names: string[];
  skin: {
    avatars: string;
    head: string;
    body: string;
    skin: string;
  };
}

export function ping(mcip: string, port: string | number): Server
export function logo(mcip: string, port: string | number): Logo
export function player(mcname: string): Player
