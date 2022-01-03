package com.test.backend.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.test.backend.models.FileMovie;
import com.test.backend.repository.FileMovieRepository;

@Service
public class FileMovieStorageService {
	
	@Autowired
    private FileMovieRepository fileMovieRepository;
	
	public FileMovie store(MultipartFile file) throws IOException {
		
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		FileMovie fileMovie = new FileMovie(fileName, file.getContentType(), file.getBytes());
		
		fileMovieRepository.save(fileMovie);
		
		return fileMovie;
		
	}
	
	
	public FileMovie getFile(String id) {
		return fileMovieRepository.findById(id).get();
	}
	  
	public Stream<FileMovie> getAllFiles() {
		return fileMovieRepository.findAll().stream();
	}  

}
