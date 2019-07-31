import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingpageService } from '../landingpage.service';
import { Authentication } from '../authentication';
import { LoginvalidationService } from '../loginvalidation.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Reviewer } from '../reviewer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { error } from 'util';
import { ReviewService } from '../review.service';
import { ReviewerdetailsService } from '../reviewerdetails.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-productreview',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.css']
})
export class ProductreviewComponent implements OnInit {
  showFiller = false;
  products : any;
  categories = [];
  subCategories = [];
  job = "";
  reviewdetails:any;
  productname="";
  reviewerinfo1 = [];
  // validatingForm: FormGroup;


  form=new FormGroup({
    emailId: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  })
  helper = new JwtHelperService();
  auth: Authentication = new Authentication();
  constructor(private router: Router, private landingpageservice: LandingpageService, private loginvalidation: LoginvalidationService,private productService:ProductService,
    private  reviewService:ReviewService,private reviewerdetail: ReviewerdetailsService) { }

  ngOnInit() {

    // priyanka
    this.productname = JSON.parse(sessionStorage.getItem('data')).productName;
    console.log("productname in  write a review" + this.productname);

    this.reviewService.getAllReviewsbyName(this.productname).subscribe((data: any) => {
      console.log("review details in search" + JSON.stringify(data));
      this.reviewdetails = data;
      console.log(JSON.stringify(this.reviewdetails));

      for (let i = 0; i < data.length; i++) {
        let image = data[i].reviewerEmail;
        console.log("emailId", image);

        this.reviewerdetail.getReviewer(image).subscribe((data: any) => {
          console.log("reviewer data in search componentttttttttttttt" + JSON.stringify(data));
          this.reviewerinfo1.push(data);
          this.reviewdetails = this.reviewdetails.map((e, i) => {
            if (e.reviewerEmail === data.emailId) {
              e.image = data.image
            }
            console.log(e, "is this object has image ??")
            return e
          })
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", this.reviewerinfo1);

        })

      }

    });

    // priyanka




    this.products=JSON.parse(sessionStorage.getItem('data'));
    // get modalFormDarkPassword() {
    //   return this.validatingForm.get('modalFormDarkPassword');
    // }
    // this.productname=JSON.parse(sessionStorage.getItem('data')).productName;
    // this.reviewService.getAllReviewsbyName(this.productname).subscribe((data:any) => {
    //   console.log("review details in search"+JSON.stringify(data));
    //   this.reviewdetails=data;
    //   console.log(JSON.stringify(this.reviewdetails));
    // });







  }

  onClick(role) {
    console.log(role);
    this.router.navigateByUrl("/account/" + role);
  }
  onClickPO(role1) {
    console.log(role1);
    this.router.navigateByUrl("/account/" + role1);
  }
  reviewer(emailId, password): any {

    this.auth.emailId = emailId;
    this.auth.password = password;
    this.loginvalidation.login(this.auth).
      subscribe((data: any) => {
        console.log("data from backend ", data.token);
        if (data.token) {
          console.log("in if");

          let role = this.helper.decodeToken(data.token).sub;
          console.log("we are having this......", data.token);

          console.log("in if print email   " + emailId);
          console.log("in if print password   " + password);
          console.log("in if print role   ", role);

          sessionStorage.setItem('reviewerEmail',emailId);
          
          if (role == this.job) {
            console.log(role);
            console.log("in if1");
            this.router.navigateByUrl("/writereview/"+ emailId);

          }
          else {
            alert("provide valid credentailds");
          }
        }

      })
  }
  
  onclick(rrole) {
    console.log(rrole);
    this.job = rrole;
  }
  onclick1(prole) {
    console.log(prole);
    this.job = prole;
  }

  newlogin(lemailId, lpassword): any {

    this.auth.emailId = lemailId;
    this.auth.password = lpassword;
    this.loginvalidation.login(this.auth).
      subscribe((data: any) => {
        console.log("data from backend ", data.token);
        if (data.token) {
          console.log("in if");

          let role = this.helper.decodeToken(data.token).sub;
          console.log("we are having this......", data.token);

          console.log("in if print email   " + lemailId);
          console.log("in if print password   " + lpassword);
          console.log("in if print role   ", role);

          if (role == 'reviewer') {
            console.log(role);
            console.log("in if1");

            this.router.navigateByUrl("/writereview");
          }
          else if (role == 'product-owner') {
            this.router.navigateByUrl("/productownerdashboard");
          }
        }
      },
        error => {
          alert("Invalid credential");
        });

  }

  searchproduct(product){
     console.log(product);
      this.productService.getProduct(product).
      subscribe(data=>{
          console.log("product info : ",data);
          // this.router.navigateByUrl("/searchreview/"+data);
      });
     
     
  }
  // When the user clicks anywhere outside of the modal, close it
  // onClickw(event) {
  // if (event.target == modal) {
  //   modal.style.display = "none";
  // }

}