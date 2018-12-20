import React from "react";
import {StyleSheet, TouchableHighlight, Text, View, Alert} from "react-native";
import t from "tcomb-form-native";

var Form = t.form.Form;

var url =
  "https://ussouthcentral.services.azureml.net/workspaces/f67890a2a70c4f58a468b80a88db2d38/services/48ba5b5ea6ba4dcd9514ab21fcd3582e/execute?api-version=2.0&format=swagger";

var token =
  "Bearer 1UYxTNH/NBgsyAamUDQh0gfigajeTv9vSn+gWiKf2VfXoXFWokJTlMqCVK5DoFBtQz2+OxQuA8e2K16ofIrRgQ==";

var Sex = t.enums({
  0: "Male",
  1: "Female"
});

var Person = t.struct({
  Age: t.Number,
  Sex: Sex,
  On_thyroxine: t.Boolean,
  Query_on_thyroxine: t.Boolean,
  On_antithyroid_medication: t.Boolean,
  Sick: t.Boolean,
  Pregnant: t.Boolean,
  Thyroid_surgery: t.Boolean,
  I131_treatment: t.Boolean,
  Query_hypothyroid: t.Boolean,
  Query_hyperthyroid: t.Boolean,
  Lithium: t.Boolean,
  Goitre: t.Boolean,
  Tumor: t.Boolean,
  Hypopituitary: t.Boolean,
  Psych: t.Boolean,
  TSH: t.Number,
  T3: t.Number,
  TT4: t.Number,
  T4U: t.Number,
  FTI: t.Number
});

var options = {
  fields: {
    TSH: {
      label: "TSH"
    },
    TT4: {
      label: "TT4"
    },
    T3: {
      label: "T3"
    },
    T4U: {
      label: "T4U"
    },
    FTI: {
      label: "FTI"
    }
  }
};
export default class ThyroidForm extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  async makeRequest(form) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          Inputs: {
            input1: [form]
          }
        })
      });
      let result = await response.json();
      let label = "";
      switch (result.Results.output1[0]["Scored Labels"]) {
        case "1":
          label = "you are safe :)";
          break;
        case "2":
          label = "you better go to a doctor :|";
          break;
        case "3":
          label = "you best go to a doctor :`(";
          break;
      }

      Alert.alert(
        'Your Result',
        label,
        [
          {text: 'OK', onPress: () => console.log('OK')},
        ],
        {cancelable: true}
      )
    } catch (error) {
      console.error(error);
    }
  }

  onPress() {
    // call getValue() to get the values of the form
    var value = JSON.parse(JSON.stringify(this.refs.form.getValue()));
    if (value) {
      // if validation fails, value will be null
      value["Result"] = "0";
      value["Age"] = `0.${value["Age"]}`;
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          const element = value[key];
          if (typeof element === "number") {
            value[key] = element.toString();
          }
          if (typeof element === "boolean") {
            value[key] = element ? "1" : "0";
          }
        }
      }
      this.makeRequest(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={Person} options={options}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Show Result</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#ffffff"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
