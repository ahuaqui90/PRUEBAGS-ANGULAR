import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _http: HttpClient) {}

  registrarUsuario(data: any): Observable<any> {
    return this._http.post('http://localhost:7275/api/usuario/grabarusuario', data);
  }

  actualizarUsuario(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:7275/api/usuario/actualizarusuario/${id}`,data);
  }

  obtenerListaUsuarios(): Observable<any> {
    return this._http.get('http://localhost:7275/api/usuario/listarusuarios');
  }

  eliminarUsuario(id: number): Observable<any> {
    return this._http.delete(`http://localhost:7275/api/usuario/eliminarusuario/${id}`);
  }

}