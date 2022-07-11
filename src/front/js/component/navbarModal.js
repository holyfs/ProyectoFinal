import React from "react";

import '../../styles/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


class ModalLogin extends React.Component {
 
  render() {
    return (
      <div className="main_container">
       
       <div class="container">
          <h2>Modal login Form</h2>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#sem-login">
            Open modal
          </button>
        
        <br/>
        <br/>
        
        <h2>Modal Registration Form</h2>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#sem-reg">
          Open modal
        </button>
        
        
       
        <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-reg">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
        
              
              <div class="modal-body seminor-login-modal-body">
              <h5 class="modal-title text-center">CREATE AN ACCOUNT</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                </button>
        
        
                <form class="seminor-login-form">
                  <div class="form-group">
                    <input type="name" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">User Name</label>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">Email address</label>
                  </div>
                  <div class="form-group">
                  <label class="select-form-control-placeholder" for="sel1">profession</label>
                  <select class="form-control" id="sel1" name="sellist1">
                    <option>Select profession</option>
                    <option>Students</option>
                    <option>Research Scholar</option>
                    <option>Professor</option>
                    <option>Others</option>
                  </select>
                  </div>
                  <div class="form-group">
                    <input type="tel" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">Phone Number</label>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">Organization</label>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">Designation</label>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="name">City</label>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="password">Password</label>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" required autocomplete="off" />
                    <label class="form-control-placeholder" for="password">Confirm Password</label>
                  </div>
              
                  <div class="form-group forgot-pass-fau text-center ">
                                                  <a href="#" class="text-secondary">
                                                      By Clicking "SIGN UP" you accept our<br />
                                                      <span class="text-primary-fau">Terms and Conditions</span>
                                                  </a>
                                              </div>
              
                    <div class="btn-check-log">
                        <button type="submit" class="btn-check-login">SIGN UP</button>
                    </div>
                    <div class="create-new-fau text-center pt-3">
                    <a href="#" class="text-primary-fau"><span data-toggle="modal" data-target="#sem-login" data-dismiss="modal">Already Have An Account</span></a>
                    </div>
                  </form>
        
              </div>
            </div>
          </div>
        </div>
        
        
        
        
         
          <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-login">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
        
              
                <div class="modal-body seminor-login-modal-body">
                <h5 class="modal-title text-center">LOGIN TO MY ACCOUNT</h5>
                  <button type="button" class="close" data-dismiss="modal">
                      <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button>
        
        
            <form class="seminor-login-form">
              <div class="form-group">
                <input type="email" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="name">Email address</label>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="password">Password</label>
              </div>
              <div class="form-group">
                <label class="container-checkbox">
                Remember Me On This Computer
                <input type="checkbox" checked="checked" required />
                <span class="checkmark-box"></span>
                </label>
                </div>
        
                <div class="btn-check-log">
                    <button type="submit" class="btn-check-login">LOGIN</button>
                </div>
        
        
              <div class="forgot-pass-fau text-center pt-3">
                                        <a href="#" class="text-secondary">Forgot Your Password?</a>
        
                                      </div>
                                      <div class="create-new-fau text-center pt-3">
                                          <a href="#" class="text-primary-fau"><span data-toggle="modal" data-target="#sem-reg" data-dismiss="modal">Create A New Account</span></a>
                                      </div>
        
        
        
              </form>
        
                </div>
              </div>
            </div>
          </div>
        
        </div>
     
      </div>
    );
  }
}
export default ModalLogin;