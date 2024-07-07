import { Component, ElementRef, ViewChild } from '@angular/core';
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
      text_content: ['', Validators.required],
    })
  }

  public onSubmit() : void {

    const { subject, from_email, text_content } = this.form.value;

    const email = {
      "subject": subject,
      "from_email": from_email,
      "text_content": text_content
    }

    // serv mail 
    this.mailServ.sendMail(email).subscribe({
      next:(res)=> {
        //redirection mail success
        this.router.navigate(["mail-success"]);
        console.log('email sended', res);
      },
      error:(e)=> {
        //redirection mail failed
        this.router.navigate(["mail-failed"]);
        console.log('error : ', e);
      },
      complete:()=> {
        console.log('email sender complete');
      }
    });
  }
  
}