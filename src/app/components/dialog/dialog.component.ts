import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ToastrService , IndividualConfig } from 'ngx-toastr';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent  implements OnInit {

  title = 'Ajouter Nouveaux Boitier';
 
    generalDetails!: FormGroup;
    communicationDetails!: FormGroup;
    equipementDetails!: FormGroup;
    general_step = false;
    communication_step = false;
    equipement_step = false;
    step = 1;


    constructor(
     private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private toastr: ToastrService , 
      ) { }


  
    ngOnInit() {
  
          this.generalDetails = this.formBuilder.group({
              code: ['', Validators.required],
              Nserie: ['', Validators.required],
              modele: ['',Validators.required],
              description: ['',Validators.required],
              positionGps: ['',Validators.required],
              installation: ['',Validators.required]
          });
  
          this.communicationDetails = this.formBuilder.group({
              Nsim: ['', Validators.required],
              iccId: ['', Validators.required],
              mcc: ['',Validators.required],
              mnc: ['',Validators.required],
              lac: ['',Validators.required],
              cid: ['',Validators.required]
          });
  
          this.equipementDetails = this.formBuilder.group({
              equipement: ['', Validators.required],
              type: ['', Validators.required],
              adresse: ['',Validators.required]
          });
    }
  
    get general() { return this.generalDetails.controls; }
    
    get communication() { return this.communicationDetails.controls; }
  
    get equipement() { return this.equipementDetails.controls; }
    next(){
 
      if(this.step==1){
            this.general_step = true;
            if (this.generalDetails.invalid) { return  }
            this.step++
      }
  
      else if(this.step==2){
          this.communication_step = true;
          if (this.communicationDetails.invalid) { return }
              this.step++;
      }
      
  
    }
  
    previous(){
      this.step--
     
      if(this.step==1){
        this.communication_step = false;
      }
      if(this.step==2){
        this.equipement_step = false;
      }
     
    }
  
    submit(){
      const toastrOptions: Partial<IndividualConfig> = {
        timeOut: 3000,
        progressBar: true,
  
      };
      
      if(this.step==3){
        this.equipement_step = true;
        if (this.equipementDetails.invalid) { return }
        this.toastr.success('Boitier Added successfully!', 'Success', toastrOptions);
        this.dialogRef.close();
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    }
 




}