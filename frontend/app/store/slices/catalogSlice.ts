import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Level = {
  id: string;
  name: string;
};

interface CatalogState {
  images: File[];
  categoryPath: Level[];
}

const initialState: CatalogState = {
  images: [],
  categoryPath: [],
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },

    addImages: (state, action: PayloadAction<File[]>) => {
      state.images = [...state.images, ...action.payload].slice(0, 9);
    },

    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
    },

    clearImages: (state) => {
      state.images = [];
    },

    // CATEGORY ACTIONS
    setCategoryPath: (state, action: PayloadAction<Level[]>) => {
      state.categoryPath = action.payload;
    },

    clearCategoryPath: (state) => {
      state.categoryPath = [];
    },
  },
});

export const {
  setImages,
  addImages,
  removeImage,
  clearImages,
  setCategoryPath,
  clearCategoryPath,
} = catalogSlice.actions;

export default catalogSlice.reducer;
