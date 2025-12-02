import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null; // aquí guardamos el ID del usuario
}

const initialState: UserState = {
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // acción para guardar el ID
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    // acción para limpiar el ID (logout)
    clearUserId: (state) => {
      state.id = null;
    },
  },
});

// exportamos las acciones
export const { setUserId, clearUserId } = userSlice.actions;

// exporta el reducer para usarlo en store.ts
export default userSlice.reducer;