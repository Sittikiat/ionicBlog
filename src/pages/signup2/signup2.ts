import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html',
})
export class Signup2Page {

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private authProvider: AuthProvider,
              private alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  public signup2(myForm) {
    console.log(myForm);
    let email = myForm.email;
    let password = myForm.password;

    // loading
    let loading = this.loadingCtrl.create({
       content: "Please Wait..."
    });
    loading.present();
    
    // subscribe
    this.authProvider.postSignup2(email, password).subscribe(
      (res) => {
        let feedback = res;
        if (feedback === true) {
          console.log("Login Success :)");
          this.navCtrl.setRoot(LoginPage);
        } else {
          console.log("Login Fail :(");
        }
      },
      (err) => {
        let errMessage = err;
        let alert = this.alertCtrl.create({
          title: "Opps !",
          subTitle: errMessage,
          buttons: ["ok"]
        });
        alert.present();
        loading.dismiss();
      },
      () => {
        console.log("Ok");
        loading.dismiss();
      }
    );
  }

}
