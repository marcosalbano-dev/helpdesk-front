import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private clienteService: ClienteService,
              private toast: ToastrService,
              private router: Router,
              private activateRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.cliente.id = this.activateRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.clienteService.delete(this.cliente.id).subscribe(resposta => {
      this.toast.success('Cliente deletado com sucesso!', 'Delete');
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message)
        })
      } else {
        this.toast.error(ex.error.message)
      }
    })
  }

}
