package com.test.backend.models;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.*;

@Entity
@Table( name = "movies"
//		,uniqueConstraints = {
//				@UniqueConstraint(columnNames = "title")}
)

public class Movie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "published")
	private boolean published;
	
	@Column(name = "releasedate", columnDefinition = "DATE DEFAULT CURRENT_DATE")
	private java.sql.Date releasedate;
	
	@Column(name = "rating", columnDefinition="Decimal(4,2) default '4.00'")
	private BigDecimal rating;
	
	@Column(name = "cast1")
	private String cast1;
	
	@Column(name = "cast2")
	private String cast2;

	


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean published) {
		this.published = published;
	}

	public java.sql.Date getReleasedate() {
		return releasedate;
	}

	public void setReleasedate(java.sql.Date releasedate) {
		this.releasedate = releasedate;
	}

	public BigDecimal getRating() {
		return rating;
	}

	public void setRating(BigDecimal rating) {
		this.rating = rating;
	}

	public String getCast1() {
		return cast1;
	}

	public void setCast1(String cast1) {
		this.cast1 = cast1;
	}

	public String getCast2() {
		return cast2;
	}

	public void setCast2(String cast2) {
		this.cast2 = cast2;
	}

	public Movie() {
		
	}
	
	public Movie(String title, String description, BigDecimal rating, Date releasedate, String cast1, String cast2) {
		this.title = title;
		this.description = description;
//		this.published = published;
		this.rating = rating;
		this.releasedate = releasedate;
		this.cast1 = cast1;
		this.cast2 = cast2;
	}
	
	public long getId() {
		return id;
	}

}
