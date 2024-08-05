import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/service/email-service/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  protected form!: FormGroup;
  protected loading: boolean = false;

  public constructor(
    private mailServ : EmailService,
    private fb: FormBuilder,
    private router: Router, 
  ){}

  public ngOnInit() {
    window.scrollTo(0, 0);
    this.form = this.fb.group({
      subject: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      firstname: [''],
      lastname: [''],
      text_content: ['', Validators.required],
      tel_number: ['', Validators.pattern("^[0-9]{10}$")],
      name: ['']
    });

    
  }

  public onSubmit() : void {

    this.loading = true;

    if (this.form.get('name')?.value) {
      console.log('Spam detected');
      return;
    }

    const { subject, from_email, text_content, tel_number, firstname, lastname } = this.form.value;

    const email = {
      "subject": subject,
      "from_email": from_email,
      "text_content": text_content,
      "tel_number": tel_number,
      "firstname": firstname,
      "lastname": lastname
    }

    // serv mail 
    this.mailServ.sendMail(email).subscribe({
      next:(res)=> {
        //redirection mail success
        this.router.navigate(["mail-success"]);
        this.loading = false
      },
      error:(e)=> {
        //redirection mail failed
        this.router.navigate(["mail-failed"]);
        console.log('error : ', e);
        this.loading = false
      },
      complete:()=> {
        this.loading = false
      }
    });
  }
  
}