import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";
import MapView from "react-native-maps";
import { Card, Button } from "react-native-elements";
import { likeJob } from "../actions";

const PHONE_WIDTH = Dimensions.get("window").width;
const PHONE_HEIGHT = Dimensions.get("window").height;

const DeckScreen = ({ jobs }) => {
  renderCard = (job) => {
    const initialRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.05,
    };

    return (
      <Card>
        <Card.Title>{job.jobtitle}</Card.Title>

        <Card.Divider />
        <View style={{ height: PHONE_HEIGHT * 0.4 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === "android" ? true : false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Card.Divider />
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}</Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Animated.View style={styles.cardStyle}>
        <Card>
          <Card.Title>All Done</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>
            There's no more content here!
          </Text>
          <Button title="Get More" backgroundColor="#03A9F4" />
        </Card>
      </Animated.View>
    );
  };

  return (
    <View>
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        keyProp="jobkey"
        onSwipeRight={(job) => likeJob(job)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  cardStyle: {
    marginTop: 20,
    justifyContent: "center",
  },
});

mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);
