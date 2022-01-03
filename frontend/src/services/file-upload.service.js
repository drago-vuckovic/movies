import http from '../common/http-common';

class UploadFilesService {
    upload(file, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return http.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getFiles() {
      return http.get("/files/download");
    }
  }
  
  export default new UploadFilesService();