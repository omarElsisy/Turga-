import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {
  blackMaskSrc="../../assets/black-mask.png";
  blueMaskSrc="../../assets/blue-mask.jpg";
  cafeMaskSrc="../../assets/cafe-mask.png";
  pinkMaskSrc="../../assets/pink-mask.png";
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // MDB Lightbox Init
      $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
      });
    });
  }


}
