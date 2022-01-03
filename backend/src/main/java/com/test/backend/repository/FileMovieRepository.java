package com.test.backend.repository;

//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.backend.models.FileMovie;

@Repository
public interface FileMovieRepository extends JpaRepository<FileMovie, String> {
	

}



