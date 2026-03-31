export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  parentId: string | null;
  isActive: boolean;
}

export interface FilterState {
  level: string;
  status: string;
  searchQuery: string;
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  byLevel: {
    0: number;
    1: number;
    2: number;
    3: number;
  };
}
