package com.stackroute.searchservice.controller;

import com.stackroute.searchservice.domain.Products;
import com.stackroute.searchservice.domain.Subcategory;
import com.stackroute.searchservice.dto.ProductDetails;
import com.stackroute.searchservice.exception.SubcategoryAlreadyExistsExceptions;
import com.stackroute.searchservice.exception.SubcategoryNotFoundException;
import com.stackroute.searchservice.service.SubcategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class SubcategoryController {

    SubcategoryService subcategoryService;


    public SubcategoryController(SubcategoryService subcategoryService1)
    {
        this.subcategoryService=subcategoryService1;
    }

    @PostMapping("subcategory")
    public ResponseEntity<?> saveSubcategory(@RequestBody Subcategory subcategory){

        ResponseEntity responseEntity;

        try {
            subcategoryService.saveSubcategory(subcategory);
            responseEntity = new ResponseEntity("Subcategory saved successfully", HttpStatus.CREATED);
        } catch (SubcategoryAlreadyExistsExceptions subcategoryAlreadyExistsExceptions) {
            responseEntity = new ResponseEntity<String>(subcategoryAlreadyExistsExceptions.getMessage(), HttpStatus.CONFLICT);
            subcategoryAlreadyExistsExceptions.printStackTrace();
        }
        return responseEntity;
    }



    @GetMapping("subcategories")
    public ResponseEntity<?> getAllSubcategory()
    {
        return new ResponseEntity<List<Subcategory>>(subcategoryService.getAllSubcategories(), HttpStatus.OK);
    }

    @GetMapping("products/{subCategory}")
    public ResponseEntity<?> findAllProductsBySubcategory(@PathVariable("subCategory") String subCategory)throws SubcategoryNotFoundException
    {
        ResponseEntity responseEntity;
        try {
            responseEntity= new ResponseEntity<List<Products>>(subcategoryService.findAllProductsBySubcategory(subCategory), HttpStatus.OK);
        } catch (SubcategoryNotFoundException s) {
            responseEntity = new ResponseEntity<String>(s.getMessage(), HttpStatus.CONFLICT);
            s.printStackTrace();
        }
        return responseEntity;

    }
    @DeleteMapping("subcategory/{subCategory}")
    public ResponseEntity<?> deleteProduct(@PathVariable("subCategory") String subCategory) {

        try {

            return new ResponseEntity<String>( subcategoryService.deleteSubcategory(subCategory), HttpStatus.OK);
        } catch (SubcategoryNotFoundException e) {
            return new ResponseEntity<String>("Details not found", HttpStatus.NOT_FOUND);
        }
    }
//    @PostMapping("products")
//    public  ResponseEntity<?> updateSubcategory(@RequestBody ProductDetails productDetails)
//    {
//
//        Date date=new Date();
//        long millies=date.getTime();
//        Timestamp timestamp=new Timestamp(millies);
//        productDetails.setUploadedOn(timestamp);
//
//
//            subcategoryService.updateSubcategory(productDetails);
//            return new ResponseEntity<String>("Subcategory updated successfully!", HttpStatus.OK);
//
//    }

}