import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { navigate } from "../navigationRef";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

const ReviewScreen = () => {
  renderLikeJobs = () => {
    return this.props.likedJobs.map((job) => {
      return (
        <Card>
          <View style={{ height: 200 }}>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
          </View>
        </Card>
      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>{renderLikeJobs()}</ScrollView>
    </SafeAreaView>
  );
};

ReviewScreen.navigationOptions = {
  title: "Review Jobs",
  headerTitleAlign: "center",
  headerRight: () => {
    return (
      <TouchableOpacity onPress={() => navigate("Settings")}>
        <Text style={styles.button}>Settings</Text>
      </TouchableOpacity>
    );
  },
  style: {
    marginTop: Platform.OS === "android" ? 24 : 0,
  },
};

const mapStateToProps = ({ likes }) => {
  console.log(likes)
  return { likedJobs : likes };
};

const styles = StyleSheet.create({
  button: {
    color: "rgba(0, 122, 255, 1)",
  },
  detailWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  italics: {
    fontStyle: "italic",
  },
});

export default connect(mapStateToProps)(ReviewScreen);
