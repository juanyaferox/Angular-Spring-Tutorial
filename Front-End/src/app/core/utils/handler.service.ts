import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class Handler {
 public handleError(error: HttpErrorResponse) {
    if (error.error?.trace?.includes('ResponseStatusException')
    ) {
      const message = this.extractError(error.error.trace);
      console.log(message)
      return throwError(() => message);
    }
    console.log("Inesperado")
    return throwError(() => 'Ocurrió un error inesperado');
  }

  private extractError(trace: string): string {
    const match = trace.match(/ResponseStatusException:.*?"(.*?)"/);
    return match ? match[1] : 'Error en la lógica de nogocio';
  }
}
