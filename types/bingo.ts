export interface Resolution {
  id: number;
  title: string;
}

export interface BingoTile extends Resolution {
  isSelected: boolean;
}

export interface Goal {
  id: number;
  title: string;
  type: string
  isUserGenerated?: boolean;
}

