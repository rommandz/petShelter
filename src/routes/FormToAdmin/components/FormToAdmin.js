import React from 'react'
import Formsy from 'formsy-react';
import MainInput from 'modules/inputs/MainInput'
import './FormToAdmin.scss'
import { connect } from 'react-redux'
import { firebaseConnect, helpers,dataToJS } from 'react-redux-firebase'
import { addPerson} from '../../../store/actions'


	const FormToAdmin = React.createClass({
		getInitialState() {
			return {
				canSubmit: false
			}
		},
		enableButton() {
			this.setState({
				canSubmit: true
			});
		},
		disableButton() {
			this.setState({
				canSubmit: false
			});
		},
		submit(model) {
      this.addPerson(model);
		},
		createNewUser({ email, password, username }) {
			  this.props.firebase.createUser(
				{ email, password },
				{ username, email }
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		},
    addPerson(personInformation){
			this.props.onAddPerson(personInformation);
			this.createNewUser({ email: personInformation.email,
			password: personInformation.email,
			username: personInformation.name});
		},
		render() {
			return (
				<div className="admin_form_wrapper">
				<div className="admin_form">
					<Formsy.Form  className="form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>						
						<MainInput name="email" type="email" validations="isEmail" placeholder="email" validations={{minLength: 7}} validationError="This is not a valid email" required/>
						<MainInput name="name" type="text" placeholder="Name" validations={{minLength: 3}} validationError="Name should contain more than 2 letters" required/>
						<MainInput name="name" type="number" placeholder="Phone number" validations={{minLength: 10}} validationError="Phone number should looks like: 0XX XXX XX XX" required/>	
						<button  type="submit" className='prim_btn' disabled={!this.state.canSubmit}>Submit</button>
					</Formsy.Form>
				</div>
				</div>
			);
		}
  });

//it is only mapStateToProps example for us
const mapStateToProps = state => {
  return {
		people: console.log(state.people)
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: personInformation => {
      dispatch(addPerson(personInformation))
		}
  }
}
  
/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormToAdmin);*/

const wrappedFormToAdmin = firebaseConnect()(FormToAdmin)

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(wrappedFormToAdmin)

