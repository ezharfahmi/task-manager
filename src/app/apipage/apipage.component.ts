import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-apipage',
  templateUrl: './apipage.component.html',
  styleUrls: ['./apipage.component.css']
})
export class ApipageComponent {
  apiData: any;
  isLoading: boolean | undefined;
  currentPage = 1;
  endofpage: boolean | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDataFromAPI();
  }

  getNextPage() {
    this.currentPage++;
    this.getDataFromAPI();
  }

  getPrevPage() {
    this.currentPage--;
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.isLoading = true;
    const apiUrl = `https://reqres.in/api/users?page=${this.currentPage}`;
  
    const headers = new HttpHeaders({
      Authorization: 'Bearer YOUR_AUTH_TOKEN'
    });

    this.http.get(apiUrl, { headers }).subscribe((response: any) => {
      console.log(response);
      this.apiData = response;
      this.isLoading = false;
      if(response.page < response.total_pages){
        this.endofpage = false;
      }else{
        this.endofpage = true;
      }
    }, (error) => {
      this.isLoading = false;
      console.error(error);
    });
  }
}
