import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiabetesService} from '../diabetes.service';
import {DiabeteRequest, DiabeteResponse} from './interfaces';

@Component({
  selector: 'app-diabetes',
  templateUrl: './diabetes.component.html',
  styleUrls: ['./diabetes.component.scss']
})
export class DiabetesComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private diabeteService: DiabetesService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      preg: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
      gluc: [40, [Validators.required, Validators.min(30), Validators.max(210)]],
      bloodpressure: [20, [Validators.required, Validators.min(10), Validators.max(140)]],
      bmi: [20, [Validators.required, Validators.min(15), Validators.max(90)]],
      diabete_pedigree_function: [0.01, [Validators.required, Validators.min(0.0001), Validators.max(4)]],
      age: [25, [Validators.required, Validators.min(18), Validators.max(90)]],
    });
  }

  get preg(): AbstractControl {
    return this.form?.get('preg')!;
  }

  get gluc(): AbstractControl {
    return this.form?.get('gluc')!;
  }

  get bloodpressure(): AbstractControl {
    return this.form?.get('bloodpressure')!;
  }

  get bmi(): AbstractControl {
    return this.form?.get('bmi')!;
  }

  get diabete_pedigree_function(): AbstractControl {
    return this.form?.get('diabete_pedigree_function')!;
  }

  get age(): AbstractControl {
    return this.form?.get('age')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log("invalid form");
      return;
    }
    const data: DiabeteRequest = {
      predict: {
        pregnancies: this.preg.value,
        glucose: this.gluc.value,
        bloodpressure: this.bloodpressure.value,
        bmi: this.bmi.value,
        diabetespedigreefunction: this.diabete_pedigree_function.value,
        age: this.age.value,
      }
    };
    this.diabeteService.predict(data).subscribe(
      (res: DiabeteResponse) => {
        console.log(res);
      }
    )
    console.log("ready to submit");
  }
}
