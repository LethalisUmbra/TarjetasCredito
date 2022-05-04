import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/models/creditCard';
import { CardService } from 'src/app/services/card.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription?: Subscription;
  card?: CreditCard;
  idCard = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cardSvc: CardService,
    private toastr: ToastrService
  )
  {
    this.form = this.formBuilder.group({
      id: 0,
      holder: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.subscription = this.cardSvc.getCard$().subscribe( data => {
      this.card = data;
      this.form.patchValue({
        holder: this.card.holder,
        cardNumber: this.card.cardNumber,
        expirationDate: this.card.expirationDate,
        cvv: this.card.cvv
      });

      this.idCard = this.card.id as number;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveCard():void {
    if(this.idCard === 0 || this.idCard === undefined)
    {
      this.add();
    }
    else
    {
      this.edit();
    }
  }

  add() {
    const card: CreditCard = {
      holder: this.form.get('holder')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.cardSvc.saveCard(card).subscribe( data => {
      this.toastr.success('Registro Agregado', 'La tarjeta fue agregada');
      this.cardSvc.getCards();
      this.form.reset();
    });
  }

  edit()
  {
    const card: CreditCard = {
      id: this.card?.id,
      holder: this.form.get('holder')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.cardSvc.updateCard(this.idCard, card).subscribe(data => {
      this.toastr.info('Registro Actualizado', 'La tarjeta fue actualizada');
      this.cardSvc.getCards();
      this.form.reset();
      this.idCard = 0;
    })
  }
}