import React from "react";
import { StyleSheet} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
 const CardComp= (props)=> {
    return (
<Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header button onPress={ navigation.navigate("TopicList")}>
              <Text style={styles.author}>
              {props.item.title}
              </Text>
            </CardItem>
            <CardItem >
              <Body>
                <Text style={styles.textbody}>
                {props.item.body}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
}
const styles = StyleSheet.create({
    textbody:{
       fontSize:20,
       },   
       author:{
          fontSize:30,
          },
  });
export default CardComp;