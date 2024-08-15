import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

//validacion personalizada que puede estar por separado , en ves de poner ahi mismo
function mustContainQuestionMark(control: AbstractControl){
  if (control.value.includes('?')) {
    return null;
  }
  return {doesNotContainQuestionMark: true}
}

//validacion asincrona personalizada
function emailIsUnique(control: AbstractControl){
  if (control.value !== 'test@example.com') {
    return of(null)
  }
  return of({notUnique: true});
}

let initialEmailValue = '';
const saveForm = window.localStorage.getItem('email')
if(saveForm){
  const loadedForm = JSON.parse(saveForm)
  //seteamos el valor del email conseguido del localstorage
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],//el que se ocupa ahora cuando usamos forms reactivos
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})
export class LoginReactiveComponent implements OnInit{
  
  private destroyRef = inject(DestroyRef);
  
  //ahora que sera reactivo
  form = new FormGroup({
    email: new FormControl(initialEmailValue,{//segundo parametro podemos poner validaciones
      validators: [Validators.email, Validators.required],
      asyncValidators:[emailIsUnique]//el metodo que hicimos
    }),
    password: new FormControl('',{
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      
    })
  });
loginData: any;

  //metodo para ser invocado en la vista y valida el email
  get emailisInvalid(){
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  ngOnInit(): void {
  //una manera de hacer
  //const saveForm = window.localStorage.getItem('email')
 
  //if (saveForm) {
    //
    //const loadedForm = JSON.parse(saveForm)
    //this.form.patchValue({
      //email: loadedForm.email//se lo asignamos a nuestra propiedad email
    //});
  //}

    //creamos email en el localstorage desde que renderice la pagina
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        //convertimos a jsonstring
        window.localStorage.setItem('email', JSON.stringify({email: value.email}))
      }

    });
    this.destroyRef.onDestroy(()=>{return subscription.unsubscribe()})
  }


  /**
   * 
   */
  onSubmit(){
    //this.form.controls.email.addValidators , otra manera q se vera despues

    console.log(this.form);
    
    const email = this.form.value.email;
    const password = this.form.value.password;

    console.log(email,password);
    

  }
}
