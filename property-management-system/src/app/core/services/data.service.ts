import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { PagedResults } from '../../shared/models/paged-results.model';
import { Car } from '../../shared/models/car.model';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable()
export class DataService {

    private readonly carsBaseUrl = '/api/cars';

    constructor(private http: HttpClient) { }

    takeAllCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.carsBaseUrl)
            .pipe(
                map(car => {
                    // ToDo: Calculate real total balance
                    return car;
                }),
                catchError(this.handleError)
            );
    }

    takeCars(page: number, pageSize: number): Observable<PagedResults<Car[]>> {
        return this.http.get<Car[]>(
            `${this.carsBaseUrl}/page/${page * pageSize}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const cars = res.body as Car[];
                    // ToDo: Calculate real total balance
                    return {
                        results: cars,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getCar(id: number): Observable<Car> {
        return this.http.get<Car>(this.carsBaseUrl + '/' + id)
            .pipe(
                map(car => {
                    // ToDo: Calculate real total balance
                    return car;
                }),
                catchError(this.handleError)
            );
    }

    addCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.carsBaseUrl, car)
            .pipe(catchError(this.handleError));
    }

    updateCar(car: Car): Observable<boolean> {
        return this.http.put<ApiResponse>(this.carsBaseUrl + '/' + car.id, car)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteCar(id: number): Observable<boolean> {
        return this.http.delete<ApiResponse>(this.carsBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}
