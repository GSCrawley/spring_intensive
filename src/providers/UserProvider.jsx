import React, { createContext, Component } from "react";
import { auth, generateUserDocument } from "../firebase"
import App from "../App";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
      user: null
    };
    
    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
          const user = await generateUserDocument(userAuth);
          this.setState({ user });
        });

    };

    render() {
            const { user } = this.state;
            return (
            <UserProvider value={this.state.user}>
                {this.props.children} 
            </UserProvider>
            );
        }
        }    
    
export default UserProvider;