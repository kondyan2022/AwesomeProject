import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { uriToBlob } from "../../utils/blobFromPhoto";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const signUpUserThunk = createAsyncThunk(
  "user/signUpUser",
  async ({ login, email, password, imageUserUri }, thunkApi) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (imageUserUri) {
        const blobFile = await uriToBlob(imageUserUri);

        const avatarRef = ref(storage, `${user.uid}/avatar.jpg`);
        await uploadBytes(avatarRef, blobFile, {
          contentType: "image/jpeg",
        });
        const proceedPhoto = await getDownloadURL(avatarRef);

        await updateProfile(user, {
          displayName: login,
          email,
          photoURL: proceedPhoto,
        });
        return thunkApi.fulfillWithValue({
          email,
          displayName: login,
          photoURL: proceedPhoto,
        });
      } else {
        await updateProfile(auth.currentUser, { email, displayName: login });
      }
      return thunkApi.fulfillWithValue({ email, displayName: login });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signInUserThunk = createAsyncThunk(
  "user/signInUser",
  async ({ email, password }, thunkApi) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signOutUserThunk = createAsyncThunk(
  "user/signOutUser",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
