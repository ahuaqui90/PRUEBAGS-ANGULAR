import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from './services/usuario.service';
import { EditarUsuarioComponent } from './editarUsuario/editarUsuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PRUEBAGSApp';

  displayedColumns: string[] = [
    'id',
    'nombre',
    'correo',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private _usuarioService: UsuarioService,
  ) {}


  ngOnInit(): void {
    this.ObtenerListaUsuarios();
  }


  ObtenerListaUsuarios(){

    this._usuarioService.obtenerListaUsuarios().subscribe({
      next: (res) => {

        debugger;
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }


  agregarUsuario() {

    //alert('agregar usuario..!!');
    
    const dialogRef = this._dialog.open(EditarUsuarioComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ObtenerListaUsuarios();
        }
      },
    });
  }


  eliminarUsuario(id: number) {
    //alert('eliminar usuario..!!');


    Swal.fire({
      title: "Eliminar Usuario",
      text: "Estas seguro de eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {

        this._usuarioService.eliminarUsuario(id).subscribe({
          next: (res) => {
            //this._coreService.openSnackBar('Employee deleted!', 'done');

            Swal.fire({
              title: "Eliminado!",
              text: "El usuario fue eliminado exitosamente!.",
              icon: "success"
            });

            this.ObtenerListaUsuarios();
          },
          error: console.log,
        });

      }
    });


  }

  editarUsuario(data: any) {

    //alert('editar usuario..!!');
 
    const dialogRef = this._dialog.open(EditarUsuarioComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.ObtenerListaUsuarios();
        }
      },
    });
 
  }
}
