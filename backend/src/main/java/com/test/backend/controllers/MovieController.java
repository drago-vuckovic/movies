package com.test.backend.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.test.backend.models.Movie;
import com.test.backend.repository.MovieRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/movies")
public class MovieController {
	
	@Autowired
	MovieRepository movieRepository;
	
	private Sort.Direction getSortDirection(String direction) {
		
	    if (direction.equals("asc")) {
	      return Sort.Direction.ASC;
	    } else if (direction.equals("desc")) {
	      return Sort.Direction.DESC;
	    }

	    return Sort.Direction.ASC;
	  }
	
//	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	@GetMapping("")
	public ResponseEntity<Map<String, Object>> getAllMovies(
			@RequestParam(required = false) String title,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
		    @RequestParam(defaultValue = "rating,desc") String[] sort) {
		
		try {
			
			List<Order> orders = new ArrayList<Order>();			
			
			if (sort[0].contains(",")) {
		        for (String sortOrder : sort) {
		          String[] _sort = sortOrder.split(",");
		          orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
		        }
		      } else {
		        orders.add(new Order(getSortDirection(sort[1]), sort[0]));
		      }
			
			
			List<Movie> moviesList = new ArrayList<Movie>();
			
			Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));
			
			Page<Movie> pageMovies;
			
			
			if(title == null) {
				pageMovies = movieRepository.findAll(pagingSort);
			} else {
				pageMovies = movieRepository.findByTitleContaining(title, pagingSort);
			}
				
			moviesList = pageMovies.getContent();
			
			if (moviesList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			Map<String, Object> response = new HashMap<>();
			
			response.put("movies", moviesList);
		    response.put("currentPage", pageMovies.getNumber());
		    response.put("totalItems", pageMovies.getTotalElements());
		    response.put("totalPages", pageMovies.getTotalPages());
			
			
			
			return new ResponseEntity<>(response, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}	
	
	@GetMapping("/{id}")
	public ResponseEntity<Movie> getMovieById(@PathVariable("id") long id) {
		Optional<Movie> movieData = movieRepository.findById(id);

	    if (movieData.isPresent()) {
	    	
	      return new ResponseEntity<>(movieData.get(), HttpStatus.OK);
	      
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@PostMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Movie> createMovie(@RequestBody Movie p_movie) {
		
		try {
			
			Movie movie = new Movie(p_movie.getTitle(),
									p_movie.getDescription(),
									p_movie.getRating(), 
									p_movie.getReleasedate(), 
									p_movie.getCast1(), 
									p_movie.getCast2());
			
			movieRepository.save(movie);
			
			return new ResponseEntity<>(movie, HttpStatus.CREATED);
			
		} catch (Exception e) {
		    	
		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		      
		}
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Movie> updateMovie(@PathVariable("id") long id, @RequestBody Movie movie) {
		
		Optional<Movie> movieData = movieRepository.findById(id);

	    if (movieData.isPresent()) {
	    	Movie _movie = movieData.get();
	      _movie.setTitle(movie.getTitle());
	      _movie.setDescription(movie.getDescription());
	      _movie.setPublished(movie.isPublished());
	      return new ResponseEntity<>(movieRepository.save(_movie), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteMovie(@PathVariable("id") long id) {
		try {
		      movieRepository.deleteById(id);
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    } catch (Exception e) {
		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		
	}

	@DeleteMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteAllMovies() {
		try {
			movieRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/published")
//	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<Map<String, Object>> findByPublished(
			@RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
		    @RequestParam(defaultValue = "rating,desc") String[] sort) {
		
		try {
			
			List<Order> orders = new ArrayList<Order>();				
			
			if (sort[0].contains(",")) {
		        for (String sortOrder : sort) {
		          String[] _sort = sortOrder.split(",");
		          orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
		        }
		      } else {
		        orders.add(new Order(getSortDirection(sort[1]), sort[0]));
		      }
						
			List<Movie> moviesList = new ArrayList<Movie>();
			
			Pageable pagingSort = PageRequest.of(page, size, Sort.by(orders));
			
			Page<Movie> pageMovies = movieRepository.findByPublished(true, pagingSort);
			
			moviesList = pageMovies.getContent();
			
			if (moviesList.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
						
			Map<String, Object> response = new HashMap<>();
			
			response.put("movies", moviesList);
		    response.put("currentPage", pageMovies.getNumber());
		    response.put("totalItems", pageMovies.getTotalElements());
		    response.put("totalPages", pageMovies.getTotalPages());

			
			return new ResponseEntity<>(response, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
