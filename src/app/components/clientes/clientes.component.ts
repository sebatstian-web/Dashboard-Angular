import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiFirebaseService } from '../../services/api-firebase.service';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Array<Cliente>;
  loading: boolean;
  form: FormGroup;

  constructor(
    private api: ApiFirebaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saldo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });

    this.loading = true;
    this.api.getClientes().subscribe((resp) => {
      this.clientes = resp;
      this.loading = false;
    });
  }

  getField(field: string) {
    return this.form.get(field);
  }

  guardarCliente() {
    // if (this.form.invalid || this.form.status === 'INVALID') return;
    console.log(this.form.value);
  }

  getSaldoTotal(): number {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }
}
