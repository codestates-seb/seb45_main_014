package com.main.bbangbbang.search.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    @GetMapping(params = "search_target=store")
    public ResponseEntity<?> getStoresByName(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        return null;
    }

    @GetMapping(params = "search_target=region")
    public ResponseEntity<?> getStoresByRegion(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        return null;
    }

    @GetMapping(params = "search_target=menu")
    public ResponseEntity<?> getStoresByMenu(@RequestParam(name = "search_keyword") String keyword,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size) {
        return null;
    }
}
