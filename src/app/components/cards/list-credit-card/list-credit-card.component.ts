import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-credit-card',
  templateUrl: './list-credit-card.component.html',
  styleUrls: ['./list-credit-card.component.scss']
})
export class ListCreditCardComponent implements OnInit {

  constructor(public cardSvc: CardService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.cardSvc.getCards();
  }

  deleteCard(id: number):void {
    if (confirm('¿Está seguro que desea eliminar el registro?'))
    {
      this.cardSvc.deleteCard(id).subscribe( data => { 
        this.toastr.warning('Registro eliminado', 'La tarjeta ha sido eliminada');
        this.cardSvc.getCards();
      });
    }
  }

  edit(card: CreditCard) {
    this.cardSvc.update(card);
  }

}
