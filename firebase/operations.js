export const createPost = async ({
  title,
  imageUrl,
  geoPosition,
  location,
}) => {
  try {
    const currentDate = Timestamp.fromDate(new Date.now());
    clg("beforeFunction");
    const newPostRef = await setDoc(doc(db, "posts", `${currentDate}`), {
      title,
      imageUrl,
      geoPosition,
      location,
      DateTimeStamp: currentDate,
      likes: [],
      comments: [],
    });
    // console.log("operatiom", newPostRef);
    return newPostRef;
  } catch (error) {
    console.log("Creat post operation ", error);
  }
};
