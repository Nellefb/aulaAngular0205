import { ClienteService } from './../../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  cliente?: Cliente;

  clienteForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private ClienteService:ClienteService, private formbuilder: FormBuilder){
    this.getClientById()
  }

  id?:string;
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.ClienteService.getbyId(this.id).subscribe((clienteResponse) => (this.cliente = clienteResponse));
    this.clienteForm = this.formbuilder.group({
      nome : [this.cliente?.nome],
      telefone : [this.cliente?.telefone],
      id : [this.cliente?.id]
    })

  }

  update():void{

    if(this.clienteForm.valid){
      const clienteAlterado:Cliente = {
        nome: this.clienteForm.value.nome,
        telefone: this.clienteForm.value.telefone,
        id: this.clienteForm.value.id
      }
      this.ClienteService.atualizar(clienteAlterado).subscribe()
      alert('Alterado com sucesso!')
  }



}
}
