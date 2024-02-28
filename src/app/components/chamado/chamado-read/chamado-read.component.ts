import { Component, OnInit } from '@angular/core';
import {Chamado} from "../../../models/chamado";
import {ChamadoService} from "../../../services/chamado.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  constructor(private chamadoService: ChamadoService,
              private toastService: ToastrService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.activateRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      console.log(resposta);
    }, ex => {
      console.log("erro" + ex);
      this.toastService.error(ex.error.error);
    });
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO';
    } else if (status == '1'){
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade:any): string {
    if(prioridade == '0'){
      return 'BAIXA';
    } else if (prioridade == '1'){
      return 'MÉDIA';
    } else {
      return 'ALTA';
    }
  }

}

