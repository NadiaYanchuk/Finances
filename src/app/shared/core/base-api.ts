import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class BaseApi {
    private baseUrl: string = "http://localhost:3000/";

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    protected get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url)).pipe(
            map((response: any) => response)
        );
    }

    protected post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data).pipe(
            map((response: any) => response)
        );
    }

    protected put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data).pipe(
            map((response: any) => response)
        );
    }
}
