import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef,  
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose} from '@angular/material/dialog';
import { ActualizarUsuarioRequest } from '../models/ActualizarUsuariorequest.model';
import { RegistrarUsuarioRequest } from '../models/RegistrarUsuarioRequest.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'editarUsuario',
    templateUrl: './editarUsuario.component.html',
    styleUrls: ['./editarUsuario.component.css'],
  })

  export class EditarUsuarioComponent implements OnInit {
   
    usuarioForm: FormGroup;
    actionForm : string = "";

    constructor(
        private _fb: FormBuilder,
        private _usuarioService: UsuarioService,
        private _dialogRef: MatDialogRef<EditarUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
      ) {
        this.usuarioForm = this._fb.group({
          nombre: '',
          correo: '',
        });
      }
   
    ngOnInit(): void {
        //debugger;
        if(this.data != null){
            this.usuarioForm.patchValue(this.data);
            this.actionForm = "Editar";
        }else{
            this.usuarioForm.reset();
            this.actionForm = "Registrar";
        }

    }


    onFormSubmit() {

        if (this.usuarioForm.valid) {
          if (this.data!= null) {
            //debugger;
            const request = new ActualizarUsuarioRequest;
            request.id =  this.data.id;
            request.nombre =this.usuarioForm.value.nombre;
            request.correo =this.usuarioForm.value.correo

            this._usuarioService
              .actualizarUsuario(this.data.id, request)
              .subscribe({
                next: (val: any) => {
                  //alert('Usuario Actualizado exitosamente!');
                  Swal.fire({
                    icon: "success",
                    title: "Usuario Actualizado exitosamente!",
                    showConfirmButton: true,
                  });
                  this._dialogRef.close(true);
                },
                error: (err: any) => {
                  console.error(err);
                },
              });
          } else {

            //debugger;
            const request = new RegistrarUsuarioRequest;
            request.nombre =this.usuarioForm.value.nombre;
            request.correo =this.usuarioForm.value.correo

            this._usuarioService.registrarUsuario(request).subscribe({
              next: (val: any) => {
                //alert('Usuario registrado exitosamente!');
                Swal.fire({
                    icon: "success",
                    title: "Usuario registrado exitosamente!",
                    showConfirmButton: true,
                  });
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
          }
        }
      }


  }