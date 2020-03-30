import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit, OnDestroy {
  public bankForm: FormGroup;
  @Output() public emitForm = new EventEmitter();
  @Input() public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bankForm = fb.group({
      balance: [0, Validators.required],
      address: [null, Validators.required],
      description: [null, Validators.required],
      currency: ['gbp', Validators.required],
      card: this.fb.group({
        balance: [0, Validators.required],
        address: [null, Validators.required],
        description: [null, Validators.required],
        currency: ['gbp', Validators.required],
      })
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.emitForm.emit(this.bankForm);
  }

  get address() {
    return this.bankForm.get('address');
  }

  get description() {
    return this.bankForm.get('description');
  }

  get currency() {
    return this.bankForm.get('currency');
  }

  get balance() {
    return this.bankForm.get('balance');
  }

}
