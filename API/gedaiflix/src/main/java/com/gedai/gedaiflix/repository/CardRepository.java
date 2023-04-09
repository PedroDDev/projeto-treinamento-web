package com.gedai.gedaiflix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gedai.gedaiflix.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long>{
    
}
