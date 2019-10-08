import { Injectable } from '@angular/core';

import { Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SelectiveStratege implements PreloadingStrategy {
    preload(route: Route, load: Observable): Observable<> {
        if (route.data && route.data['preload']) {
            return load();
        }
        return of(null);
    }
}
