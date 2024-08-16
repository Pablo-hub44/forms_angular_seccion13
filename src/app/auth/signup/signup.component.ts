import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * 
//validar password password-confirmada 
 * @param control 
 */
function equalValuev1(control: AbstractControl){
  //traemos los valores de password y confirm password
  const password = control.get('password')?.value; //todos los objetos de control no dan un metodo get() que toma el onmbre del control
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null; //si todo bien retorne null
  }

  //si da error retorne un objeto de error
  return {passwordsNotEqual: true}
}

//v2
function equalValue(controlName1:string, controlName2:string){
  return (control:AbstractControl)=>{
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;//si todo bien retorne null
    }
    //si da error retorne un objeto de error
    return {passwordsNotEqual: true}
  } 
}


@Component({
  selector: 'app-signup',
  standalone: true,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [FormsModule, ReactiveFormsModule]
})
export class SignupComponent {


  //el form donde almacenaremos los datos, asignado tambien en el HTML
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    //podemos hacer un subgrupo
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required]
      }),
    },{//el tercer parametro es para poner objeto de configuracion, o agregas validaciones mas avanzadas
      validators:[equalValue('password','confirmPassword')]//equalValue
    }),
    
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    //otro subgrupo para la direccion
    direction :new FormGroup({
      street: new FormControl('', {     validators: [Validators.required] }),
    number: new FormControl('', { validators: [Validators.required] }),
    postalCode: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('',{
      validators: Validators.required
    }),
    }),
    role: new FormControl<'student' | 'teacher' |'employee' |
      'founder' | 'other'>('student', {validators: [Validators.required]}),
    //form array da una lista de controlos , recibe un array de formControls
    source: new FormArray([
      new FormControl(false),//por cada mm input q estamos poniendo y los ponemos en el input del html
      new FormControl(false),
      new FormControl(false),
    ]),
    terms: new FormControl(false, {validators:[Validators.required]})
  })


  onSubmit() {//form: NgForm
    //validamos si el form es valido
    if (this.form.invalid) {
      console.log('formulario invalido');
      alert('Revise sus datos, Saludos');
      return;
    }
    console.log('form data', this.form.value);

  }

  /**
   * metodo para limpiar el formulario
   */
  onReset() {
    this.form.reset();
  }

  //!mas info de forms es https://angular.dev/guide/forms
}
