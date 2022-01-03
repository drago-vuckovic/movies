package com.test.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.test.backend.models.Movie;

//public interface MovieRepository extends JpaRepository<Movie, Long> {
//	
//	List<Movie> findByPublished(boolean published);
//	
//	List<Movie> findByTitleContaining(String title);
//
//}


public interface MovieRepository extends PagingAndSortingRepository<Movie, Long> {
	
	Page<Movie> findByPublished(boolean published, Pageable pageable);
	Page<Movie> findByTitleContaining(String title, Pageable pageable);	

}


//public interface MovieRepository extends JpaRepository<Movie, Long> {
//	
//	Page<Movie> findByPublished(boolean published, Pageable pageable);
//	Page<Movie> findByTitleContaining(String title, Pageable pageable);	
//
//}
//
