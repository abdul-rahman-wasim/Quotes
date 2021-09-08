import React from 'react';
import { Container, Footer, FooterTab, Button} from 'native-base';
import { Text} from "react-native";
import {Link} from "react-router-native";
 const NavBarBottom = ({history}) => {

    return (
      
      <Container>

        <Footer >
          <FooterTab>
            <Button onPress={
                   ()=> history.push("/") 
            }>
            <Text>Home</Text>
     
            </Button>
            <Button onPress={
                   ()=> <Link to="/discover"></Link> 
            }>
            <Text>Discover</Text>
            </Button>
            <Button onPress={
                   ()=> history.push("/topics") 
            }>
    
            <Text>Topics</Text>
         
            </Button>
            <Button onPress={
                   ()=> history.push("/lists") 
            }>

            <Text>Lists</Text>
       
            </Button>
            <Button onPress={
                   ()=> history.push("/search") 
            }>

            <Text>Search</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  export default NavBarBottom