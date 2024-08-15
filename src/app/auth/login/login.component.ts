import { Component, DestroyRef, afterNextRender, inject, viewChild } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms'
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

private form = viewChild.required<NgForm>('form');
private destroyRef = inject(DestroyRef);

constructor(){
  //hook q e ejecuta despues de rederizar el componente
  afterNextRender(()=>{
    const emailGuardado = window.localStorage.getItem('email');

    if (emailGuardado) {
      //convertirmos a un objeto json, ya que estaba guardado en jsonString
      const cargadoEmailGuardado = JSON.parse(emailGuardado);
      
      //si pasaramos un objeto
      //this.form().setValue({
      //  email: cargadoEmailGuardado.email,
      //  password: ''
      //})
      
      //le damos un tiempo 
      setTimeout(()=>{
        this.form().controls['email'].setValue(cargadoEmailGuardado.email)
      },100)
      
    }

    //guardamos el dato en el local storage
    const subscription = this.form()?.valueChanges?.pipe(debounceTime(900)).subscribe({// con debounceTime(500) le damos medio seg para que vuelva a renderizar y nolo haga de inmediato
      next:(value)=>{
        console.log(value.email)
        //lo guardamos en el localstorage
        window.localStorage.setItem(
          'email', JSON.stringify({email: value.email})
        )
      }
    });

    this.destroyRef.onDestroy(()=>{return subscription?.unsubscribe()})

  })
}

// Define a model to bind to the form fields
loginData = {
  email: '',
  password: ''
};

/**
 * 
 * @param form recibe los datos del formulario
 */
onSubmit(form: NgForm) {
console.log(form);
if (form.invalid) {
  return;
}
if (form.valid) {
  console.log(this.loginData); // Display the form data el objeto
  
  const email= form.form.value.email;//igual lo estamos consiguiendo
  const password = form.form.value.password;

  console.log(email, password);
  

  form.reset();//limpiamos el formulario

  //form.
}
}



  
}
