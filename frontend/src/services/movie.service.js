import http from "../common/http-common";
import authHeader from './auth-header';

class MovieDataService {
  
  // getAll() {
  //   return http.get("/movies");
  // }

  getAll(params) {
    return http.get("/movies", { params });
  }
    
  get(id) {
    return http.get(`/movies/${id}`, { headers: authHeader() });
  }
    
  create(data) {
    return http.post("/movies", data, { headers: authHeader() });
  }
    
  update(id, data) {
    return http.put(`/movies/${id}`, data, { headers: authHeader() });
  }
    
  delete(id) {
    return http.delete(`/movies/${id}`, { headers: authHeader() });
  }
    
  deleteAll() {
    return http.delete(`/movies`, { headers: authHeader() });
  }
    
  findByTitle(title) {
    return http.get(`/movies?title=${title}`, { headers: authHeader() });
  }
}

export default new MovieDataService();