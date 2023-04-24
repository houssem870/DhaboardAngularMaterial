import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit, OnDestroy {
  private onClick: any;

  constructor(
    private elementRef: ElementRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  ngOnDestroy(): void {
    // Remove the click listener when the component is destroyed
    document.removeEventListener('click', this.onClick);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '500px';
    dialogConfig.position = {'top': '-37%', 'left': '25%' };
    


    const dialogRef=this.dialog.open(DialogComponent, dialogConfig);

    // Add a click listener to the document
    dialogRef.afterOpened().subscribe(() => {
      this.onClick = (event: MouseEvent) => {
        const dialogEl = document.querySelector('.cdk-overlay-pane');
        if (dialogEl && !dialogEl.contains(event.target as HTMLElement)) {
          // Close the dialog if the click is outside the dialog
          this.dialog.closeAll();
          // Remove the click listener from the document
          document.removeEventListener('click', this.onClick);
        }
      };
      document.addEventListener('click', this.onClick);
    });
  }
}