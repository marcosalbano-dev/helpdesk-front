import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private tecnicoService: TecnicoService,
              private toast: ToastrService,
              private router: Router,
              private activateRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.tecnico.id = this.activateRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(resposta => {
      this.toast.success('Técnico deletado com sucesso!', 'Delete');
      this.router.navigate(['tecnicos'])
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
