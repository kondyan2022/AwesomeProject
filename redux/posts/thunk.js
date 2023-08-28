import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { auth, db, storage } from "../../firebase/config";
import { uriToBlob } from "../../utils/blobFromPhoto";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { Timestamp } from "firebase/firestore";

export const addPostThunk = createAsyncThunk(
  "posts/add",
  async ({ title, imageUrl, geoPosition, location, date }, thunkApi) => {
    try {
      const blobFile = await uriToBlob(imageUrl);
      // console.log("load image");
      const user = auth.currentUser;
      const postId = `${date}_${user.uid}`;
      const pathStore = `images/${postId}.jpg`;
      // console.log("Storage path", pathStore);
      const imageRef = ref(storage, pathStore);
      await uploadBytes(imageRef, blobFile, {
        contentType: "image/jpeg",
      });
      const imageUri = await getDownloadURL(imageRef);
      // console.log("thunk", imageUri);
      const newPostData = {
        id: postId,
        uid: user.uid,
        title,
        imageUri,
        geoPosition,
        location,
        date,
        likes: [],
        comments: [],
      };
      await setDoc(doc(db, "posts", newPostData.id), newPostData);

      return;
    } catch (error) {
      // console.log("Thunk AddPost: ", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addCommentToPostThunk = createAsyncThunk(
  "posts/addComment",
  async ({ postId, uid, userImageUrl, date, comment }, thunkApi) => {
    try {
      // console.log("addCommentToPostThunk", {
      //   postId,
      //   uid,
      //   userImageUrl,
      //   date,
      //   comment,
      // });
      await updateDoc(doc(db, "posts", `${postId}`), {
        comments: arrayUnion({ uid, userImageUrl, date, comment }),
      });
    } catch (error) {
      console.log("Thunk Add comment: ", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addLikeThunk = createAsyncThunk(
  "posts/addLike",
  async ({ postId, uid }, thunkApi) => {
    try {
      // console.log("Add like", uid);
      await updateDoc(doc(db, "posts", `${postId}`), {
        likes: arrayUnion(uid),
      });
    } catch (error) {
      // console.log("Thunk add Like: ", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeLikeThunk = createAsyncThunk(
  "posts/removeLike",
  async ({ postId, uid }, thunkApi) => {
    try {
      // console.log("remove like", uid);
      await updateDoc(doc(db, "posts", `${postId}`), {
        likes: arrayRemove(uid),
      });
    } catch (error) {
      // console.log("Thunk remove Like: ", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchAllThunk = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkApi) => {
    try {
      refDoc = collection(db, "posts");
      const allPostsSnapShot = await getDocs(refDoc);
      result = [];

      allPostsSnapShot.forEach((doc) => result.unshift(doc.data()));
      return thunkApi.fulfillWithValue(result);
    } catch (error) {
      // console.log("Thunk fetchAll: ", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
