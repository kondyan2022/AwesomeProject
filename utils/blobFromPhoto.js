export const getBlobFromPhoto = async (uri) => {
  try {
    const response = await fetch(uri);
    return response.blob();
  } catch (e) {
    console.log(e);
  }
};

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};
