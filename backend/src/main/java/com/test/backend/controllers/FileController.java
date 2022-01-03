package com.test.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.test.backend.models.FileMovie;
import com.test.backend.payload.response.FileResponse;
import com.test.backend.payload.response.MessageResponse;
import com.test.backend.service.FileMovieStorageService;

import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/files")
public class FileController {
	
	@Autowired
	private FileMovieStorageService fileMovieStorageService;
	
	@PostMapping("/upload")
	  public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
	    String message = "";
	    try {
	    	fileMovieStorageService.store(file);

	      message = "Uploaded the file successfully: " + file.getOriginalFilename();
	      return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
	    } catch (Exception e) {
	      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
	      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
	    }
	  }

	  @GetMapping("/download")
	  public ResponseEntity<List<FileResponse>> getListFiles() {
		  
	    List<FileResponse> files = fileMovieStorageService.getAllFiles().map(dbFile -> {
	      String fileDownloadUri = ServletUriComponentsBuilder
	          .fromCurrentContextPath()
	          .path("/api/files/download/")
	          .path(dbFile.getId())
	          .toUriString();

	      return new FileResponse(
	          dbFile.getName(),
	          fileDownloadUri,
	          dbFile.getType(),
	          dbFile.getData().length);
	    }).collect(Collectors.toList());

	    return ResponseEntity.status(HttpStatus.OK).body(files);
	  }

	  @GetMapping("/download/{id}")
	  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
		  
		  FileMovie fileDB = fileMovieStorageService.getFile(id);

	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
	        .body(fileDB.getData());
	  }
	

}
