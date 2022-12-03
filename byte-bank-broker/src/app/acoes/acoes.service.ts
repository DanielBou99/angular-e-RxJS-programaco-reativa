import { Acao } from './modelo/acoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PoComponentsModule } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes() {
    return this.httpClient
      .get<any>('http://localhost:3000/acoes')
      .pipe(
        tap((valor) => console.log(valor)),
        map((api) => api.payload),
        tap((valor) => console.log(valor)),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) return 1;
    if (acaoA.codigo < acaoB.codigo) return -1;
    return 0;
  }
}
