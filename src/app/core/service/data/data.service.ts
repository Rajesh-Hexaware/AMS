import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiKey: string = "c325b83880f66fd5659226a788f5959f";
  constructor(private http: HttpClient) {}

  public getCountryList(): Observable<any> {
    return this.http.get('assets/JSON/countrys.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getExpenseCategoryList(): Observable<any> {
    return this.http.get('assets/JSON/expenseCategoryList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getExpenseList(): Observable<any> {
    return this.http.get('assets/JSON/expenseList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getCustomerList(): Observable<any> {
    return this.http.get('assets/JSON/customerList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getQuotationList(): Observable<any> {
    return this.http.get('assets/JSON/quotationList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getTransferList(): Observable<any> {
    return this.http.get('assets/JSON/transferList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getUserList(): Observable<any> {
    return this.http.get('http://10.5.8.12/AMS/api/userList').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public postUser(data:any): Observable<any> {
    return this.http.post('http://10.5.8.12/AMS/api/userList',data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getInvoiceReport(): Observable<any> {
    return this.http.get('assets/JSON/invoiceReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getProductList(): Observable<any> {
    return this.http.get("https://10.5.8.12/AMS/api/Product").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getProductListById(id:any): Observable<any> {
    return this.http.get("https://10.5.8.12/AMS/api/Product/" + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public postProductData(data: any): Observable<any> {
    return this.http.post("https://10.5.8.12/AMS/api/Product",data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public updateProductData(data: any, id: number) {    
    return this.http.put("https://10.5.8.12/AMS/api/Product/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  public deleteProductData(id: number) {
    return this.http.delete<any>("https://10.5.8.12/AMS/api/Product/" + id).pipe(map((res: any) => {
      return res;
    }))
  }

  public upload(file: any) {
    const formData = new FormData();
    formData.append('image', file)
    return this.http.post<any>('https://api.imgbb.com/1/upload', formData, { params: { key: this.apiKey } }).pipe(map((res: any) => {
      return res;
    }));
  }
  public getCategoryList(): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/categoryList").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public postCategoryList(data: any): Observable<any> {
    return this.http.post("http://10.5.8.12/AMS/api/categoryList",data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getCategoryListById(id:any): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/categoryList/" + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public updateCategoryList(data: any, id: number) {    
    return this.http.put("http://10.5.8.12/AMS/api/categoryList/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  public deleteCategoryList(id: number) {
    return this.http.delete<any>("http://10.5.8.12/AMS/api/categoryList/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
  public uploadCategory(file: any) {
    const formData = new FormData();
    formData.append('image', file)
    return this.http.post<any>('https://api.imgbb.com/1/upload', formData, { params: { key: this.apiKey } }).pipe(map((res: any) => {
      return res;
    }));
  }
  public getSubcategoryList(): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/subCategoryList").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public postSubcategoryList(data: any): Observable<any> {
    return this.http.post("http://10.5.8.12/AMS/api/subCategoryList",data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSubcategoryListtById(id:any): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/subCategoryList/" + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public updateSubcategoryList(data: any, id: number) {    
    return this.http.put("http://10.5.8.12/AMS/api/subCategoryList/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  public deleteSubcategoryList(id: number) {    
    return this.http.delete<any>("http://10.5.8.12/AMS/api/subCategoryList/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
  public getBrandList(): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/BrandList").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public postBrandList(data: any): Observable<any> {
    return this.http.post("http://10.5.8.12/AMS/api/BrandList",data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getBrandListById(BrandId:any): Observable<any> {
    
    return this.http.get("http://10.5.8.12/AMS/api/BrandList/" + BrandId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public updateBrandList(data: any, BrandId: number) {    
    return this.http.put("http://10.5.8.12/AMS/api/BrandList/" + BrandId, data).pipe(map((res: any) => {
      return res;
    }))
  }
  public deleteBrandList(BrandId: number) {
    return this.http.delete<any>("http://10.5.8.12/AMS/api/BrandList/" + BrandId).pipe(map((res: any) => {
      return res;
    }))
  }
  public uploadBrand(file: any) {
    const formData = new FormData();
    formData.append('image', file)
    return this.http.post<any>('https://api.imgbb.com/1/upload', formData, { params: { key: this.apiKey } }).pipe(map((res: any) => {
      return res;
    }));
  }
  public getSalesList(): Observable<any> {
    return this.http.get('assets/JSON/salesList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSalesReturnLists(): Observable<any> {
    return this.http.get('assets/JSON/salesreturnLists.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPurchaseList(): Observable<any> {
    return this.http.get('assets/JSON/purchaseList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSalesReturnList(): Observable<any> {
    return this.http.get('assets/JSON/salesreturnLists.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPurchaseReturnList(): Observable<any> {
    return this.http.get('assets/JSON/purchaseReturnList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSupplierList(): Observable<any> {
    return this.http.get('assets/JSON/supplierList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPeopleUserList(): Observable<any> {
    return this.http.get('assets/JSON/peopleUserList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getStoreList(): Observable<any> {
    return this.http.get('assets/JSON/storeList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getStateList(): Observable<any> {
    return this.http.get('assets/JSON/stateList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPurchaseOrderReport(): Observable<any> {
    return this.http.get('assets/JSON/purchaseOrderReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getInventoryReport(): Observable<any> {
    return this.http.get('assets/JSON/inventoryReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSalesReport(): Observable<any> {
    return this.http.get('assets/JSON/salesReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPurchaseReport(): Observable<any> {
    return this.http.get('assets/JSON/purchaseReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getCustomerReport(): Observable<any> {
    return this.http.get('assets/JSON/customerReport.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPaymentSettings(): Observable<any> {
    return this.http.get('assets/JSON/paymentSettings.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getCurrencySettings(): Observable<any> {
    return this.http.get('assets/JSON/currencySettings.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getGroupPermission(): Observable<any> {
    return this.http.get('assets/JSON/groupPermission.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getTaxRates(): Observable<any> {
    return this.http.get("http://10.5.8.12/AMS/api/TaxRate").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSupplierReport1(): Observable<any> {
    return this.http.get('assets/JSON/supplierReport1.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSupplierReport2(): Observable<any> {
    return this.http.get('assets/JSON/supplierReport2.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSupplierReport3(): Observable<any> {
    return this.http.get('assets/JSON/supplierReport3.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getSalesListModal(): Observable<any> {
    return this.http.get('assets/JSON/salesListModal.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPos1(): Observable<any> {
    return this.http.get('assets/JSON/pos1.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPos2(): Observable<any> {
    return this.http.get('assets/JSON/pos2.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getPos3(): Observable<any> {
    return this.http.get('assets/JSON/pos3.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getEditPermission(): Observable<any> {
    return this.http.get('assets/JSON/editpermisssion.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getEvents() {
    return this.http.get<any>('assets/JSON/scheduleevents.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public getDataTable() {
    return this.http.get<any>('assets/JSON/datatables.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
