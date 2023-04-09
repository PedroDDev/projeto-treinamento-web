package com.gedai.gedaiflix.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gedai.gedaiflix.entity.Card;
import com.gedai.gedaiflix.repository.CardRepository;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping(value = "/gedaiflix-api")
public class CardController {

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/cards")
    public ResponseEntity<List<Card>> getCards() {

        List<Card> result = new ArrayList<Card>();

        result = cardRepository.findAll();

        if (result.size() > 0)
            return new ResponseEntity<List<Card>>(result, HttpStatus.OK);
            
        return new ResponseEntity<List<Card>>(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
