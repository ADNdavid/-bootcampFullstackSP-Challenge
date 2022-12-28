package com.adndavid.adnbank.controller;

import com.adndavid.adnbank.entity.Product;
import com.adndavid.adnbank.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("http://localhost:4200/")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/client/{clientOwner}")
    public ResponseEntity<List<Product>> findProducts(@PathVariable String clientOwner){
        try{
            return new ResponseEntity<>(productService.findProducts(clientOwner),HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<Product> findProduct(@PathVariable long accountNumber){
        try{
            return new ResponseEntity<Product>(productService.findProduct(accountNumber), HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        return new ResponseEntity<Product>(productService.createProduct(product), HttpStatus.CREATED);
    }

    @PutMapping("/{accountNumber}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product,@PathVariable long accountNumber){
        try{
            Product currentProduct=productService.findProduct(accountNumber);
            currentProduct.setState(product.getState());
            currentProduct.setCurrent_balance(product.getCurrent_balance());
            currentProduct.setAvailable_balance(product.getAvailable_balance());
            currentProduct.setExempt_of_gmf(product.getExempt_of_gmf());
            currentProduct.setLast_modification_date(product.getLast_modification_date());
            currentProduct.setLast_modification_user(product.getLast_modification_user());


            productService.updateProduct(currentProduct);

            return new ResponseEntity<Product>(HttpStatus.OK); //check later
        }catch (Exception exception){
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
    }

}
